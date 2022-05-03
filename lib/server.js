#!/usr/bin/env node

import express from 'express'
import path from 'path'
import { exists, existsSync } from 'fs'
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketConfig from '../config/websocket.js'
import { createSocketEvent } from './socket.js'
import { openBrowser } from '../util/index.js'

import chalk from 'chalk'

import { router } from './router.js'
const app = express()
const __dirname = path.resolve()

// // router
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
    console.log('服务器运行于' + chalk.green('http://127.0.0.1:3000/'));
    process.nextTick(() => {
      if(existsSync(path.resolve(__dirname, 'dist')))
        openBrowser('http://localhost:3000/index.html')
    })
  })
}

