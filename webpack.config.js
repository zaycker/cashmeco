var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // entry: ['babel-polyfill', './src/entry.js'],
  entry: './src/entry.js',
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
    extensions: ['.js'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
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
          plugins: [
            'transform-decorators-legacy',
            'syntax-async-functions',
            'transform-regenerator',
            ['transform-react-jsx', { pragma: 'h' }],
            ['transform-runtime', {
              'polyfill': false,
              'regenerator': true
            }]
          ],
          presets: ['es2015', 'stage-0'],
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
