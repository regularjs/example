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
            { test: /\.rgl$/, loader: 'rgl' },
            { test: /\.js$/, loader: 'babel?cacheDirectory'}
        ]

    }
};