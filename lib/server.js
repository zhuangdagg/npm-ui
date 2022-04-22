const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
app.get('/', function(req, res, next) {
  res.send('hello word!')
})
const httpServer = createServer(app)
const io = new Server(httpServer, {})

// websocket events
io.on('connection', (socket) => {
  socket.on('init', (arg) => {
    console.log('from client content:', arg )
  })

  socket.emit('init', { data: 'form server'})
})

module.exports = function createServer() {

  httpServer.listen(3000)
  console.log('服务器运行于 http://127.0.0.1:3000/');
}

