const path = require('path')
module.exports = {
    entry: {
        chat: [
            '/Users/luonan/Sites/vue_demo/vuex-mytest/vuex/examples/chat/app.js'
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
}
