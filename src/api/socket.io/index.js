import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000')

socket.on('connect', (arg) => {
  console.log('socket.io is connection')
})