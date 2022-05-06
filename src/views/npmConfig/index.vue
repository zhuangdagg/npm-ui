<template>
  <div class="npm-config">
    <div>属性：</div>
    <div class="npm-config-contain">
      <div class="left">
        <div v-for="key in keyArr" :key="'key'+ key">
            <a :href="'#_'+ key">{{key}}</a>
        </div>
      </div>
      <el-form class="right">
        <el-form-item :id="'_' + key" v-for="key in keyArr" :key="key" :label="key">
          <!-- <el-input v-model="form[key]"></el-input> -->
          <div>{{attr(key)}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted, watchEffect, toRefs, isReactive } from 'vue'
// import { useConfigStore } from '@/stores/config.js'
// TODO: 响应性问题
let form = store.config.config
let keyArr = computed(() => {
  return Object.keys(store?.config?.config || [])
})
let attr = computed(() => {
  return (key) => store.config.config[key]
})
onMounted(() => {
  watchEffect(() => {
  })
})
</script>
<style lang="scss">
.npm-config {
  padding: 10px;
  &-contain {
    padding: 10px 0;
    @include flex('', flex-start, left);
  }
  .el-form {
    .el-form-item {
      display: block;
      margin: 10px 20px;
    }
  }
}
</style>