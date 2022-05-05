<template>
<el-scrollbar>
<div class="main">
  <div class="main-project">
    <div>当前项目</div>
    <div>node版本</div>
  </div>
  <div>
    <NpmConfig></NpmConfig>
  </div>
</div>
</el-scrollbar>
</template>
<script setup>
import NpmConfig from '@/views/npmConfig/index.vue'
</script>
<style lang="scss">
.main {
  height: calc(100% - 100px);
  overflow-y: auto;
}
  .main-project {
    
    padding: 10px;
    @include flex();
  }
</style>