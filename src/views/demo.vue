<template>
<div class="demo">demo for webpack-dev-server</div>

</template>
<script>
export default {
  name: 'demo',

  mounted() {
    const ws = new WebSocket('ws://localhost:3000')
    ws.onopen = function(evt) {
      console.log('Connection open ...')

      ws.send(JSON.stringify({
        type: 'init',
        content: 'form client init'
      }))

      ws.onmessage = function(event) {
        console.log(JSON.parse(event))
      }
    }
  },
}
</script>
<style lang="scss">
  .demo {
    color: #f00;
  }
</style>
