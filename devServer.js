var app = require('express')()
var http = require('http').Server(app)
var httpProxy = require('http-proxy')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var path = require('path')

var PORT = 8081

var apiProxy = new httpProxy.createProxyServer({ // eslint-disable-line new-cap
  target: {
    port: 8080,
    host: 'localhost'
  }
})
var webpackCompiler = webpack(webpackConfig)
var serverOptions = {
  contentBase: 'http://localhost:' + PORT,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true }
}

app.use(require('webpack-dev-middleware')(webpackCompiler, serverOptions))
app.use(require('webpack-hot-middleware')(webpackCompiler))

app.use(['/api/*'], function (req, res) {
  req.url = req.originalUrl // Janky hack to pass also query string and parameters...
  apiProxy.web(req, res)

  apiProxy.on('error', (err) => {
    console.log('Proxy error\n', err)
    res.end('Proxy error', 500)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

http.on('upgrade', (req, socket, head) => {
  apiProxy.ws(req, socket, head)
})

http.listen(PORT, () => {
  console.log(`HMR server on http://localhost:${PORT} [${app.settings.env}]`)
})

process.on('SIGTERM', () => {
  http.close(() => {
    process.exit(0)
  })
})
