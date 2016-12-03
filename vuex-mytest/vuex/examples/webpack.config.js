const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// var rs = fs.readdirSync(__dirname).reduce((entries, dir) => {
//   const fullDir = path.join(__dirname, dir)
//   const entry = path.join(fullDir, 'app.js')
//   if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
//     entries[dir] = ['webpack-hot-middleware/client', entry]
//   }
//
//   return entries
// }, {})
// { chat:
//    [ 'webpack-hot-middleware/client',
//      '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/chat/app.js' ],
//   counter:
//    [ 'webpack-hot-middleware/client',
//      '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/counter/app.js' ],
//   'counter-hot':
//    [ 'webpack-hot-middleware/client',
//      '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/counter-hot/app.js' ],
//   'shopping-cart':
//    [ 'webpack-hot-middleware/client',
//      '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/shopping-cart/app.js' ],
//   todomvc:
//    [ 'webpack-hot-middleware/client',
//      '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/todomvc/app.js' ] }


// console.log(rs);

module.exports = {

    devtool: 'inline-source-map',

    // entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    //   const fullDir = path.join(__dirname, dir)
    //   const entry = path.join(fullDir, 'app.js')
    //   if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    //     entries[dir] = ['webpack-hot-middleware/client', entry]
    //   }
    //
    //   return entries
    // }, {}),
    entry: {
        todomvc: [
            '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/todomvc/app.js'
        ]
    },
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }]
    },

    resolve: {
        alias: {
            vuex: path.resolve(__dirname, '../build/dev-entry')
        }
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('shared.js'),
        // new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        // }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ]

}
