const path = require('path')

const __DEV__ = process.env.NODE_ENV !== 'production'

const basePath = path.resolve(__dirname, '..')
const configPath = __dirname
const webpackSource = path.join(basePath, 'src', 'app')
const webpackDestination = path.join(basePath, 'dist', 'app')
const webpackPublicPath = __DEV__ ? '/' : '/file-upload-example/'

module.exports = {
  basePath,
  configPath,
  webpackSource,
  webpackDestination,
  webpackPublicPath
}
