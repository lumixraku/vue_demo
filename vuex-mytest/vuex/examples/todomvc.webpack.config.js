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

    // devtool: 'inline-source-map',

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
        //loader本质上做的是一个anything to JS的转换
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.vue$/,  //将vue文件转为js文件
            loader: 'vue'
        }]
    },

    resolve: {

        //别名
        //比如 import Haha from 'haha' 会在node_modules中寻找haha
        // 我想引入自己的某个文件  必须是 ./ 或者 ../开头 表示路径
        // 或者通过设置别名  就可以直接通过 名字来引用啦
        alias: {
            // vuex: path.resolve(__dirname, 'vuex.js')
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
