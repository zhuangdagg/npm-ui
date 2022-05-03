<template>
  <div class="login">
    <div v-if="!status.isLogin" @click="loginIn">Login in</div>
    <el-dropdown v-else trigger="click"
      @command="loginOut"
    >
      <div>{{ loginForm.username }}</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="out">Login out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog v-model="status.dialogVisible" title="Login In" width="40%">
    <el-form class="login-form"
      ref="formRef"
      :model="loginForm"
      :rules="formRules"
    >
      <template v-if="status.isFirst">
        <el-form-item label="账号：" prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="loginForm.password" type="密码" placeholder="密码" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱" />
        </el-form-item>        
      </template>
      <el-form-item v-else label="OTPassword：" prop="OTPassword">
        <el-input v-model="loginForm.OTPassword" :placeholder="`one-time password from ${loginForm.email || 'your email'}`"/>
      </el-form-item>
    </el-form>
    <el-button @click="loginIn(formRef)" :loading="status.buttonLoading">{{status.isFirst ? 'Login In' : 'Submit' }}</el-button>
  </el-dialog>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import { useConfigStore } from '@/stores/config.js'
  import {socket} from '@/api/socket.io/index.js'
  import { runScript } from '@/util/index.js'
  let config = useConfigStore()
  let formRef = ref(null)
  let status = reactive({
    isLogin: config.isLogin,
    dialogVisible: false,
    isFirst: true,
    buttonLoading: false
  })
  let loginForm = reactive({
    username: '',
    password: '',
    email: '',
    OTPassword: '',
  })
  let formRules = reactive({
    username: [
      { required: true, message: '请填写账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请填写密码', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请填写邮箱', trigger: 'blur' }
    ],
    OTPassword: [
      { required: true, message: '请填写一次性密码', trigger: 'blur' }
    ]
  })
  //  socket.emit('login', loginForm)
  
  function loginIn(formRef) {
    if(!status.dialogVisible) {
      status.dialogVisible = true
      return 
    } else {
      formRef.validate(valid => {
        if(!valid) return 
        if(status.isFirst) {
          console.log('login', loginForm.username)
          status.buttonLoading = true
          // emit login message
          // socket.emit('login', loginForm)
          // listen success callback

          // socket.once('login', (arg) => {
          //   if(1) {
          //     // success
          //     status.isFirst = false
          //     status.buttonLoading = false
          //   } else {
          //     status.buttonLoading = false
          //   }
          // })
          setTimeout(() => {
            status.isFirst = false
            status.buttonLoading = false
          }, 3000)
          
        } else {
          // emit OTPassword
          // socket.emit('OTPassword', { OTPassword: OTPassword.value })
          // socket.on('login', (arg) => {
          //   status.isLogin = true
          // })
          status.isLogin = true
          status.dialogVisible = false

        }
      })
      
    }
  }

  function loginOut(command) {
    let _script = {
      id: 'logout',
      command: 'npm',
      attrs: ['logout'],
      options: {}
    }
    runScript(_script).then(res => {
      status.isLogin = false
      config.setLoginStatus(data || stdout)
    }).catch(err => {
      console.log(err)
    })
  }

  // init
  (function init() {
    runScript({
      id: 'whoami',
      command: 'npm',
      attrs: ['whoami']
    }).then(res => {
      let { data, stdout } = res
      if( data || stdout) {
        status.isLogin = true
        loginForm.username = data || stdout
        config.setLoginStatus(data || stdout)
      }
    }).catch(err => {
      console.log(err, '--whoami error')
    })
  })()
</script>
<style lang="scss"></style> 