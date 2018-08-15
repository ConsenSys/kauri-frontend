require('@babel/register')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const { join } = require('path')
const favicon = require('serve-favicon')
const { parse } = require('url')
const url = require('url')
const request = require('request')
const routes = require('./routes')

const handler = routes.getRequestHandler(app)
const path = require('path')
const server = express()

const swPwa = (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl
  if (pathname === '/service-worker.js') {
    const filePath = join(__dirname, '.next', pathname)

    app.serveStatic(req, res, filePath)
  } else {
    handler(req, res, parsedUrl)
  }
}

app.prepare().then(() => {
  server.get('/image-proxy', (req, res) => {
    let parts = url.parse(req.url, true)
    const imageUrl = parts.query.url
    request.get(imageUrl).pipe(res)
  })
  server.use(favicon(path.join(__dirname, 'static', 'favicon', 'favicon.ico')))
  server.use(helmet())
  server.use(compression())
  server.use(handler)

  if (process.env.NODE_ENV === 'production') {
    server.use(swPwa)
  }

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
