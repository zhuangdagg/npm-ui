#!/usr/bin/env node

import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketConfig from '../config/websocket.js'
import { createSocketEvent } from './socket.js'
import { openBrowser } from '../util/index.js'

import { router } from './router.js'
const app = express()
const __dirname = path.resolve()

// // router
console.log(__dirname, path.resolve(__dirname, 'dist'))
app.use('/', express.static(path.resolve(__dirname, 'dist')))
app.use('/', router)

const httpServer = createServer(app)
console.log({socketConfig})
const io = new Server(httpServer, socketConfig)

// // websocket events
createSocketEvent(io)


export function runServer () {
  let port = 3000
  httpServer.listen(port, function(e) {
    console.log('服务器运行于 http://127.0.0.1:3000/');
    process.nextTick(() => {
      openBrowser('http://localhost:3000/index.html')
    })
  })
}

