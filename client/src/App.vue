<template>
  <div id="app">
    <div id="nav">
      <router-link class="vhome" to="/"><img alt="Vue logo" class="img-V" src="./assets/logo.png"></router-link>
      <router-link to="/articles">Wall</router-link>
      <router-link class="mine" to="/my-articles" v-if="isLogin">My Articles</router-link>
      <FormLogin v-bind:isLogin="isLogin" @statLogin="pullLogStat"></FormLogin>
    </div>
    <router-view v-bind:isLogin="isLogin"/>
  </div>
</template>

<script>
import FormLogin from '@/components/FormLogin.vue'

export default {
  name: 'home-page',
  components: {
    FormLogin
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    pullLogStat (value) {
      this.isLogin = value
    }
  },
  created () {
    let datatoken = localStorage.getItem('token')
    if (datatoken) {
      this.isLogin = true
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 15px 0 35px;
  background: #42b983;
  text-align: left;
}

#nav a {
  position: absolute;
  font-size: large;
  top: 35px;
  left: 10%;
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
  text-decoration: none;
}

.img-V {
  width: 50px;
  margin: -5px;
}

#nav a.router-link-exact-active {
  color: #000;
}

.vhome {
  margin-left: -4%;
}

.mine {
  margin-left: 4%;
}
</style>
