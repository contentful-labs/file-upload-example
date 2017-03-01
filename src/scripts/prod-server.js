import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import config from 'sane-config'

const { serverHost, serverPort } = config.app
const { webpackDestination, webpackPublicPath } = config.paths

const server = new Koa()
const app = new Koa()
app.use(serve(webpackDestination))

server.use(mount(webpackPublicPath, app))

server.listen(serverPort)
console.log(`\n🌍 Simple static http server listening at http://${serverHost}:${serverPort}${webpackPublicPath}`)
