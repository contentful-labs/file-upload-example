const { join, resolve } = require('path')

const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const config = require('sane-config')

const { webpackSource, webpackDestination, webpackPublicPath } = config.paths

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const webpackConfig = {
  entry: {
    app: [join(webpackSource, 'app.js')]
  },
  devtool: __DEV__ ? '#cheap-eval-source-map' : false,
  output: {
    path: webpackDestination,
    publicPath: webpackPublicPath,
    filename: __DEV__ ? '[name].js' : '[name]-[chunkhash].js'
  },
  performance: {
    hints: __PROD__ ? 'warning' : false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          webpackSource,
          resolve(__dirname, 'node_modules/preact-compat')
        ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [
          join(webpackSource, 'assets', 'styles'),
          /node_modules/
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: true,
                minimize: __PROD__
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        include: [
          join(webpackSource, 'assets', 'styles'),
          /node_modules/
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                minimize: __PROD__
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/font-woff',
              name: './fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'image/svg+xml',
              name: './images/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      webpackSource,
      'node_modules'
    ],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      'lodash-es': 'lodash',
      'lodash.get': 'lodash/get',
      'lodash.isfunction': 'lodash/isFunction',
      'lodash.isobject': 'lodash/isObject',
      'lodash.merge': 'lodash/merge',
      'lodash.reduce': 'lodash/reduce',
      'lodash.set': 'lodash/set',
      'lodash.unset': 'lodash/unset'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      filename: '404.html'
    }),
    new Webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(config)
    }),
    new ExtractTextPlugin('styles.css'),
    new LodashModuleReplacementPlugin()
  ]
}

if (__DEV__) {
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  webpackConfig.plugins.push(new Webpack.NoEmitOnErrorsPlugin())
}

if (__PROD__) {
  webpackConfig.plugins.push(new Webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }))
  webpackConfig.plugins.push(new Webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }))
  webpackConfig.plugins.push(new Webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  }))
  webpackConfig.plugins.push(new Webpack.optimize.AggressiveMergingPlugin())
  webpackConfig.plugins.push(new Webpack.optimize.ModuleConcatenationPlugin())
}

module.exports = webpackConfig
