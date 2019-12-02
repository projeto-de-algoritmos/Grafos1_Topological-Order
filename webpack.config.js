const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET_POINT = process.env.TARGET_POINT;
const NODE_MODE = process.env.NODE_ENV || 'development'; 
const IS_PROD = NODE_MODE === 'production';

const INPUT_CLIENT = path.resolve(__dirname, './app/app.ts');
const INPUT_SERVER = path.resolve(__dirname, './server/server.ts');
const OUT_PATH = 'dist';

const clientPolyfill = ['whatwg-fetch'];

const rules = [
    {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader'
    }
];

const resolve = {
    extensions: ['.tsx', '.ts', '.js']
};

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify(NODE_MODE)}
    })
];

console.log('process.env.NODE_ENV: ' + NODE_MODE);

// ----- CONFIGS
const CLIENT_CONFIG = {
    target: 'web',
    entry: [...clientPolyfill, INPUT_CLIENT],
    output: {
        path: path.resolve(OUT_PATH),
        filename: 'app.bundle.js'
    },
    // devtool: IS_PROD ? false : 'eval-source-map',
    devtool: 'eval-source-map',
    module: {
        rules: rules.concat([{
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            })
        }])
    },
    resolve: resolve,
    plugins: plugins
        .concat([
            new Clean([OUT_PATH]),
            new Copy([
                // { from: './index.html' },
                { from: './node_modules/react-md/dist/react-md.teal-blue.min.css', to: 'react-md.min.css' }
            ]),
            new ExtractTextPlugin({
                filename: 'main.css',
                allChunks: true
            })
        ])
};

module.exports = CLIENT_CONFIG;