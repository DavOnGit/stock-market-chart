'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'

console.log(`Webpack ENV: ${NODE_ENV}`)

/*
    ENTRIES SETTINGS
*/
const baseEntries = ['./src/js/index.jsx']
const devEntries = ['webpack-hot-middleware/client', ...baseEntries]
const prodEntries = [...baseEntries]

/*
    PLUGINS SETTINGS

    Commons plugins
*/
const commonsPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) }
  }),
  new HtmlWebpackPlugin({
    template: 'src/html/index.template.ejs',
    inject: 'body',
    alwaysWriteToDisk: true
  }),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js',
    minChunks: Infinity
  })
]

/* Develop plugins */
const devPlugins = [
  ...commonsPlugins,
  new webpack.HotModuleReplacementPlugin()
]

/* Productioon plugins */
const extractCSS = new ExtractTextPlugin({filename: 'stylesheets/[name]-css.css', allChunks: true})
const extractSASS = new ExtractTextPlugin({filename: 'stylesheets/[name]-scss.css', allChunks: true})
const prodPlugins = [
  ...commonsPlugins,
  extractCSS,
  extractSASS,
  new UglifyJSPlugin({
    compress: {warnings: false},
    comments: false,
    sourceMap: true
  })
]

/*
    WEBPACK CONFIGURATION
*/
const config = {
  context: __dirname,
  entry: {
    application: isProd ? prodEntries : devEntries,
    vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: ''
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        use: isDev ? [ 'style-loader', 'css-loader' ]
        : extractCSS.extract({ fallback: 'style-loader', use: 'css-loader', publicPath: '/dist/stylesheets' })
      },
      {
        test: /\.scss$/,
        use: isDev
          ? [ 'style-loader', 'css-loader', {loader: 'sass-loader'} ]
          : extractSASS.extract({ fallback: 'style-loader', use: ['css-loader', {loader: 'sass-loader'}], publicPath: '/dist/stylesheets' })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',
          publicPath: '/'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: isProd ? prodPlugins : devPlugins,
  devtool: isProd ? undefined : 'source-map',
  performance: isProd ? {
    hints: 'warning',
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.scss') || assetFilename.endsWith('.css') ||
        assetFilename.endsWith('.jsx') || assetFilename.endsWith('.js')
    }
  } : false
}

module.exports = config
