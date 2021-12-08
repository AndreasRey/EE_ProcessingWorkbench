const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",         
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      minify: (file, sourceMap) => {
        // https://github.com/mishoo/UglifyJS2#minify-options
        const uglifyJsOptions = {
          /* your `uglify-js` package options */
        };
        if (sourceMap) {
          uglifyJsOptions.sourceMap = {
            content: sourceMap,
          };
        }
        return require("uglify-js").minify(file, uglifyJsOptions);
      },
    })],
    splitChunks: {
      cacheGroups: {
        lodash: {
          test: /[\\/]node_modules[\\/]\b(\w*lodash.\w*|lodash)\b[\\/]/,
          name: 'lodash',
          chunks: 'all'
        },
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: 'jquery',
          chunks: 'all'
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          name: 'bootstrap',
          chunks: 'all'
        },
        leaflet: {
          test: /[\\/]node_modules[\\/]\b(\w*leaflet.\w*|leaflet)\b[\\/]/,
          name: 'leaflet',
          chunks: 'all'
        },
        d3: {
          test: /[\\/]node_modules[\\/]\b(\w*d3-\w*|d3)\b[\\/]/,
          name: 'd3',
          chunks: 'all'
        },
        moment: {
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          name: 'moment',
          chunks: 'all'
        },
        datatables: {
          test: /[\\/]node_modules[\\/]\b(\w*datatables.net-\w*|datatables.net)\b[\\/]/,
          name: 'datatables',
          chunks: 'all'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -20
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": JSON.stringify('PROD')
    } )
  ]
});