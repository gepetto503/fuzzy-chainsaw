/*
  Configures how assets served by the browser (e.g. CSS, JS, images) are processed by webpack.
  This is a shared base webpack configuration, and the options may be overridden by consumers of this factory.
  Note that this configuration is used by all asset generation (both for dist and styleguide), so changes apply in both places.

  Paths and such are passed down from the webpack.config.js, this only configures the actions webpack will perform.
*/
const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = ({
  devtool = 'cheap-module-eval-source-map',
  entry = '.js',
  outputPath = path.resolve(__dirname, 'dist'),
  publicPath = './dist/',
  outputScript = '/tmp/bundle.js',
  outputStyle = '/tmp/bundle.css',
}) => ({
  devServer: {
    stats: 'errors-only'
  },
  devtool: devtool,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    main: entry
  },
  output: {
    path: outputPath,
    filename: outputScript
  },
  publicPath: publicPath,
  postcss: require('./postcss-pack.js'),
  module: {
    loaders: [
      {
        test: /\.jsx|js?$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?context=./source/&name=/assets/images/[name]-[md5:hash:hex:8].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.md$/,
        loader: 'html!md'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(outputStyle)
  ]
});
