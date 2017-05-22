const express = require('express')
const app = express()
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)
const bodyParser = require('body-parser')
const path = require('path')

try {
  const key = require('./config/')
  process.env.KEY = key
} catch (e) {
  console.log(e, process.env.KEY)
}

const IS_DEV = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

if (IS_DEV) {
  require('piping')({ main: './server/server.js', hook: true })
}

console.log(`Http server starting in ${app.settings.env.toUpperCase()} mode`)

// tell the app to parse HTTP body messages & application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

httpServer.listen(PORT, () => {
  console.log(`Micro-App on ${HOST}:${PORT} [${app.settings.env}]`)
})

// process.on('SIGTERM', () => {
//   httpServer.close(() => {
//     process.exit(0)
//   })
// })
