module.exports = {
    entry: './app/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.elm']
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: 'elm-webpack'
            }
        ],

        noParse: /\.elm$/
    },

    devServer: {
        inline: true,
        stats: 'errors-only'
    }
};
