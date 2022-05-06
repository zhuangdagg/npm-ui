<template>
  <header>
    <Logo/>
    <Login></Login>
  </header>
  <Main></Main>
  <slot />

  <footer>
  </footer>
</template>

<script setup>
import Logo from '@/components/svg/logo/index.vue'
import Login from './components/login.vue'
import Main from './components/main.vue';
</script>

<style lang="scss">
  header {
    display: flex;
    padding: 0 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 400px;
    height: 60px;
    background-color: black;
    z-index: 2;
    & > .logo {
      position: relative;
      top: 4px;
      width: 120px;
    }
  }
  footer {
    // height: 50px;
    // .logo {
    //   height: 20px;
    // }
  }
</style>