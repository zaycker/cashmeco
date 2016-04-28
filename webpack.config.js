var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['.js']
  },
  externals: {
    leaflet: 'L'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.png$|\.jpg$/,
        loader: 'file-loader'
      },
    ],
  },

  devServer: {
    inline: true,
    stats: 'errors-only',
    contentBase: './dist'
  },
};
