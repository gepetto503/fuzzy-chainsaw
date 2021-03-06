/*
  Webpack configuration to precompile vendor
  modules DLLs before the main bundle
*/

const webpackMerge = require('webpack-merge');
const dllWorkflow = require('./workflow/dll');
const { source } = require('../lib/path-helpers');

const { dlls } = require(source('fc-config')); // eslint-disable-line


module.exports = webpackMerge(dllWorkflow, {
  entry: {
    vendor: dlls.vendor,
    styleguide: dlls.styleguide,
    tests: dlls.tests
  }
});
