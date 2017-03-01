const { join } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('sane-config')

const { webpackSource, webpackDestination, webpackPublicPath } = config.paths

const __DEV__ = process.env.NODE_ENV !== 'production'
const __PROD__ = process.env.NODE_ENV === 'production'

const webpackConfig = {
  entry: {
    app: ['babel-polyfill', join(webpackSource, 'app.js')]
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
          webpackSource
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          join(webpackSource, 'assets', 'styles'),
          /node_modules/
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
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
      }
    ]
  },
  resolve: {
    modules: [
      webpackSource,
      'node_modules'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    }),
    new Webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(config)
    })
  ]
}

if (__DEV__) {
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  webpackConfig.plugins.push(new Webpack.NoEmitOnErrorsPlugin())
}

if (__PROD__) {
  webpackConfig.plugins.push(new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  webpackConfig.plugins.push(new Webpack.optimize.AggressiveMergingPlugin())
  webpackConfig.plugins.push(new Webpack.optimize.UglifyJsPlugin({
    screwIE8: true
  }))
}

module.exports = webpackConfig
