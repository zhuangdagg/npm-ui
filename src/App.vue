<template>
<el-scrollbar height="100%">
<Layout>
  <!-- <template v-slot>
    <div class="contain">body</div>
  </template> -->
</Layout>
</el-scrollbar>
</template>
<script setup>
  import Layout from '@/layouts/default.vue' 
  import {socket} from '@/api/socket.io/index.js'
  import { useConfigStore } from '@/stores/config.js'
  let config = useConfigStore()
  socket.on('init', (arg) => {
    config.initConfig(arg?.data)
    console.log('init npm config!')
  })

 
</script>

<style lang="scss">
  body {
    position: relative;
    margin: 0;
  }
  .contain {
    height: 500px;
    background-image: url('@/assets/svg/npm-ui.svg');
  }
</style>