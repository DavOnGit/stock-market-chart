const request = require('request')
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

let stockStore = []
let usersConnected = 0

if (IS_DEV) {
  require('piping')({ main: './server/server.js', hook: true })
}

console.log(`Http server starting in ${app.settings.env.toUpperCase()} mode`)

// Handle socket.io connections
io.on('connection', socket => {
  usersConnected++

  io.emit('newwsconn', stockStore)

  socket.on('stock:client:insert', data => {
    const stock = data.stockSymbol.toUpperCase()
    const findIndex = stockStore.some((el, idx, arr) => {
      return stock === el['Meta Data']['2. Symbol']
    })
    if (findIndex) {
      socket.emit('stock:error', 'Error: requested stock already present')
      return null
    }
    const path = `http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.KEY}`
    request({url: path}, (err, response, body) => {
      if (err) {
        console.error('stock request data error')
        socket.emit('stock:error', `Network error: pls try again...`)
      }
      const thisStock = JSON.parse(body)

      if (thisStock['Error Message']) {
        socket.emit('stock:error', `Error: stock ${stock} not found`)
      } else {
        stockStore.push(thisStock)
        io.emit('stock:insert', thisStock)
      }
    })
  })
  socket.on('stock:client:delete', data => {
    const newStore = [
      ...stockStore.slice(0, data),
      ...stockStore.slice(data + 1)
    ]
    stockStore = newStore
    io.emit('stock:delete', data)
  })
  socket.on('disconnect', () => {
    usersConnected--
    if (usersConnected === 0) { stockStore = [] }
    console.log('A user disconnected from ws. Users connected: ' + usersConnected)
  })
})

// tell the app to parse HTTP body messages & application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
  })
}

httpServer.listen(PORT, () => {
  console.log(`Micro-App on ${HOST}:${PORT} [${app.settings.env}]`)
})
