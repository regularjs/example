var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname ,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.js$/, loader: 'babel?cacheDirectory'}
        ]

    },
    devtool: 'source-map'
};