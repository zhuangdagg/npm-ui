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
        <el-form-item :id="'_' + key" v-for="key in Object.keys(form)" :key="key" :label="key">
          <el-input v-model="form[key]"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config.js'
// TODO: 响应性问题
let config = useConfigStore()
let form = config.config
let keyArr = computed(() => {
  return Object.keys(form)
})
onMounted(() => {
})
</script>
<style lang="scss">
.npm-config {
  &-contain {
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