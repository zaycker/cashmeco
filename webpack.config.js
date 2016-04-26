module.exports = {
    entry: './app/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['.js'],
    },
    module: {
        externals: {
            'react': 'React'
        },
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|_)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.css$/,
                loader: 'style!css',
            },
        ],
    },

    devServer: {
        inline: true,
        stats: 'errors-only',
    },
};
