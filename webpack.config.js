const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    watch: true,
    target: 'node',
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: './tsconfig.json',
                logLevel: 'info'
            })
        ],
        alias: {
            '@app/': './src/app/',
            '@user/': './src/user/',
            '@db/': './src/database/'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
    },
};