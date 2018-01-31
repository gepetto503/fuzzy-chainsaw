/*
  Defines the shared webpack config used by all workflows.
  This is a shared base webpack configuration, and the options may be overridden by consumers of this factory.
*/

const path = require('path');
const pkgpath = require('packpath');
const webpack = require('webpack');

const { source, dest, baseUrl } = require('../../lib/path-helpers');

const { outputFormats } = require(source('fc-config')); // eslint-disable-line

let vendorManifest;
let styleguideManifest;

try {
  vendorManifest = require(dest('assets/dlls/vendor-manifest.json')); // eslint-disable-line
  styleguideManifest = require(dest('assets/dlls/styleguide-manifest.json')); // eslint-disable-line
} catch (e) {
  // let failures happen
  // styleguide manifest will be missing on CI builds
}


module.exports = {
  devtool: 'source-map',
  node: {
    fs: "empty",
  },  
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      FcUtils: path.resolve(__dirname, '../../lib/fc-utilities'),

      '@source': source(),
      '@static': source('static'),
      '@lib': source('lib'),
      '@pages': source('pages'),

      '@elements': source('elements'),
      '@vars': source('elements/variables'),
      '@atoms': source('elements/atoms'),
      '@molecules': source('elements/molecules'),
      '@organisms': source('elements/organisms'),
      '@templates': source('elements/templates'),
      '@modifiers': source('elements/modifiers'),

      '@styleguide': source('styleguide'),
      '@sg-vars': source('styleguide/variables'),
      '@sg-atoms': source('styleguide/atoms'),
      '@sg-molecules': source('styleguide/molecules'),
      '@sg-organisms': source('styleguide/organisms'),
      '@sg-templates': source('styleguide/templates'),

      '@cg-atoms': source('catalog/elements/atoms'),
      '@cg-molecules': source('catalog/elements/molecules'),
      '@cg-organisms': source('catalog/elements/atoms'),
      '@cg-templates': source('catalog/elements/atoms')
    }
  },
  output: {
    path: dest(),
    publicPath: baseUrl,
    filename: `assets/${outputFormats.js}`,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader' // linting
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(pkgpath.self()),
      manifest: styleguideManifest
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(pkgpath.self()),
      manifest: vendorManifest
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(baseUrl)
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      FcUtils: 'FcUtils'
    })
  ].filter((a) => a) // filter undefined when running in CI mode
};
