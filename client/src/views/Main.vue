<template>
  <div class="home">
    <br><br><br><br>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="My First Vue Blog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
