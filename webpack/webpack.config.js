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
            { test: /\.rgl$/, loader: path.join(__dirname, 'rgl.js') },
            { test: /\.js$/, loader: 'babel?cacheDirectory'}
        ]

    }
};