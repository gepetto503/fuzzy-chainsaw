/*
  Webpack configuration to precompile vendor
  modules DLLs before the main bundle
  in CI mode only the vendor entry is included
  in production mode
*/

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const dllProductionWorkflow = require('./workflow/dll.production');
const { source } = require('../lib/path-helpers');

const { dlls } = require(source('fc-config')); // eslint-disable-line


module.exports = webpackMerge(dllProductionWorkflow, {
  entry: {
    vendor: dlls.vendor
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CI_MODE': true
    })
  ]
});
