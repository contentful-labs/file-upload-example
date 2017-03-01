const join = require('path').join
const config = require('sane-config')

module.exports = {
  plugins: {
    'postcss-import': {
      path: [
        join(config.paths.webpackSource, 'assets', 'styles')
      ]
    },
    'postcss-url': {},
    'postcss-cssnext': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {}
  }
}
