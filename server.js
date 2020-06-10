// @ts-check
import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'
import * as querystring from 'querystring'
// import { mapData } from './map-data.js'
import { douglasPeucker, webMercator } from './algorithms.js'

const HOST = '0.0.0.0'
const PORT = 3000

let rootDir

if (process.argv.length === 2) {
  rootDir = 'public'
} else if (process.argv.length === 3) {
  rootDir = process.argv[2]
} else {
  const filename = path.parse(process.argv[1]).base
  console.log(`Usage: node ${filename} [directory]`)
  process.exit(2)
}

http.createServer(handleRequest).listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})

function handleRequest (request, response) {
  // Allow GET only
  if (request.method !== 'GET') {
    response.statusCode = 405
    response.setHeader('Content-Type', 'text/plain')
    response.end(http.STATUS_CODES[response.statusCode])
    return
  }

  const url = request.url === '/' ? '/index.html' : request.url
  if (url.startsWith('/mapdata')) {
    const queryParams = querystring.parse(url.split('?')[1])
    serveGeodata(response, queryParams)
  } else {
    const filePath = path.join(rootDir, url)
    serveFile(response, filePath)
  }
}

function serveGeodata (response, queryParams) {
  const { BL_ID: stateId, resolution, zoom } = queryParams

  // const geodata = mapData.features.filter(elem => elem.attributes.BL_ID === stateId || stateId === '0')
  //   .flatMap(elem => elem.geometry.rings)
  //   .map(ring => ring.map(([long, lat]) => webMercator(long, lat, zoom)))
  //   .map(ring => applyResolution(ring, resolution))
  const geodata = {}

  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(geodata))
}

function applyResolution (ring, resolution) {
  switch (resolution) {
    case 'high':
    default:
      return ring
    case 'medium':
      return douglasPeucker(ring, 1 / 3)
    case 'low':
      return douglasPeucker(ring, 3 / 4)
  }
}

function serveFile (response, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.statusCode = err.code === 'ENOENT' ? 404 : 500
      response.setHeader('Content-Type', 'text/plain')
      response.end(`${http.STATUS_CODES[response.statusCode]} => ${err.message}`)
    } else {
      response.setHeader('Content-Type', getContentType(path.extname(filePath)))
      response.end(data)
    }
  })
}

function getContentType (extension) {
  switch (extension) {
    case '.html':
    case '.htm':
      return 'text/html'
    case '.css':
      return 'text/css'
    case '.js':
    case '.mjs':
      return 'text/javascript'
    default:
      return 'text/plain'
  }
}
