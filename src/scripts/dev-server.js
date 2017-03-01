import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../../webpack.config'
import config from 'sane-config'

const { serverHost, serverPort } = config.app

try {
  const webpack = Webpack(webpackConfig)
  const server = new WebpackDevServer(webpack, {
    host: 'localhost',
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    watchOptions: undefined,
    hot: false,
    hotOnly: false,
    clientLogLevel: 'info',
    stats: 'normal'
  })
  server.listen(serverPort, 'localhost', function (err) {
    if (err) {
      throw err
    }
    console.log('---------')
    console.log(`🌍  Starting development server at http://${serverHost}:${serverPort}`)
    console.log('---------')
  })
} catch (e) {
  if (e instanceof Webpack.WebpackOptionsValidationError) {
    console.error(e.message)
    process.exit(1)
  }
  throw e
}
