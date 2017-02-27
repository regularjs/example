

var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin")



var config =  {
    // entry: {
    //     common: path.join(__dirname, "../client/chunks/common")
    // },
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.js$/, loader: 'babel?cacheDirectory'}
        ]

    },
    // externals: ['path', /server/ ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // new CommonsPlugin("commons.js", ["common"]),
        // copy file from app/client/assets
        new CopyWebpackPlugin([
            { from: 'app/assets' }
        ]),

    ],
    'devtool':'source-map',
    'watch':true
};

if(argv.production){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ); 
    delete config.watch
    delete config.devtool;
}


module.exports = config;