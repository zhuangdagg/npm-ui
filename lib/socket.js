import { configInstance } from "./npmConfig.js"
import { login } from './addUser.js'
import { execaSync } from 'execa'

export function createSocketEvent (io) {
  io.on('connection', (socket) => {
    socket.on('runScript', (arg) => {
      console.log('from client content:', arg )
      let { id, command, attrs = [], options = {}} = arg
      try {
        let { stdout, stderr } = execaSync(command, attrs, options)
        if(id) {
          socket.emit(id, { data: stdout, stdout, stderr })
        }
      } catch (error) {
        if(id) {
          socket.emit(id, { error })
        }
      }
      
    })

    // login
    socket.on('login', (params) => {
      login(params, socket)
    })
  
    socket.emit('init', { data: configInstance.config})
  })
}


