<template>
<div class="demo">
</div>
<button v-on:click="handleClick">click</button>

</template>
<script>
import {io} from 'socket.io-client'
export default {
  name: 'demo',
  data() {
    return {
      color: '#f0f'
    }
  },
  emits: {
  },
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
  methods: {
    handleClick() {
      console.log('click')
    }
  }
}
</script>
<style lang="scss">
  .demo {
    color: v-bind(color);
  }
</style>
