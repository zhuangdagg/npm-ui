import { configInstance } from "./npmConfig.js"

export function createSocketEvent (io) {
  io.on('connection', (socket) => {
    socket.on('runScript', (arg) => {
      console.log('from client content:', arg )
    })
  
    socket.emit('init', { data: configInstance.config})
  })
}


