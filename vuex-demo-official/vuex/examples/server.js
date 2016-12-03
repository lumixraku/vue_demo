const express = require('express')
const webpack = require('webpack')


// THIS MIDDLEWARE SHOULD ONLY BE USED FOR DEVELOPMENT!
// DO NOT USE IT IN PRODUCTION!
const webpackDevMiddleware = require('webpack-dev-middleware')

//This allows you to add hot reloading into an existing server without webpack-dev-server.
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})







//HMR  Hot module Replacement
// HMR is faster because it updates code in-place without refreshing.
