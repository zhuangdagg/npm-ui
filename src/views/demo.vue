<template>
<div class="demo">demo for webpack-dev-server</div>

</template>
<script>
import {io} from 'socket.io-client'
export default {
  name: 'demo',

  mounted() {
    const socket = io('http://localhost:3000')
    socket.on('connect', (arg) => {
      console.log('connect', arg)
    })
    socket.on('init', (arg) => {
      console.log('init', arg)
    })
    socket.emit('runScript', { run: 'npm run dev'})
  },
}
</script>
<style lang="scss">
  .demo {
    color: #f00;
  }
</style>
