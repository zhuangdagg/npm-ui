<template>
  <div class="login">Login In</div>
</template>
<script setup>
  import { useConfigStore } from '@/stores/config.js'
  let config = useConfigStore()
  console.log(config.isLogin,"---eee")
</script>
<style lang="scss"></style> 