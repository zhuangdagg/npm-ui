<template>
<Layout>
  <template v-slot>
    <div class="contain">body</div>
  </template>

</Layout>
</template>
<script setup>
  import Layout from '@/layouts/default.vue' 
  import {socket} from '@/api/socket.io/index.js'
  import { useConfigStore } from '@/stores/config.js'
  let config = useConfigStore()
  socket.on('init', (arg) => {
    config.initConfig(arg?.data)
  })

 
</script>

<style lang="scss">
  body {
    position: relative;
    margin: 0;
  }
  .contain {
    height: 500px;
  }
</style>