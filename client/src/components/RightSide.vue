<template>
  <div class="detail">
    <router-view :key="$route.fullPath" :isLogin="isLogin"></router-view>
  </div>
</template>

<script>

export default {
  name: 'right-side',
  data () {
    return {
      baseUrl: 'http://myblog-server.hanabc.xyz'
    }
  },
  props: ['isLogin', 'articles'],
  methods: {
  }
}
</script>

<style scoped>
detail {
  width: 90%;
  height: auto;
}
</style>
