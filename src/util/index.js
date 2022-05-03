import {socket} from '@/api/socket.io/index.js'

export function runScript(params = {}) {
  return new Promise((resolve, reject) => {
    socket.emit('runScript', params)
    if(params.id) {
      socket.once(params.id, (arg) => {
        // middle handler

        let { msg, error } = arg
        if(error) reject(arg)
        else resolve(arg)
      })
    } else {
      resolve(null)
    }
  })
  
}