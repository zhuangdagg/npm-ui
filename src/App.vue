<template>
<div>
  <div id="tele"></div>
  <Demo></Demo>
</div>
</template>
<script setup>
import Demo from '@/views/demo.vue'
// export default {
//   name: 'App',
//   components: {
//     // Demo
//   }
// }
</script>
<script>
  export default {
    name: 'App',
    mounted() {
      console.log('666')
    }
  }
</script>
<style></style>