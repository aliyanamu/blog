<template>
  <div class="container col-12" v-if="!isLogin">
  <div class="notif" v-if="notif.length !== 0"> {{this.notif}} </div>
    <label for='formlog1'><i class='fa fa-envelope'></i>Email</label>
    <input v-model='email' @keyup="removeErr" type='email' id='formlog1'>

    <label for='formlog2'><i class='fas fa-key'></i>Password</label>
    <input v-model='password' @keyup="removeErr" type='password' id='formlog2'>

    <button class='log-btn' @click='login'>Join</button>
  </div>
  <div class="col-12" v-else>
    <button class='logout-btn' @click='logout'>Logout</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormLogin',
  props: ['isLogin'],
  data () {
    return {
      email: '',
      password: '',
      baseUrl: 'http://myblog-server.hanabc.xyz',
      notif: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: this.baseUrl + '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          let token = data.data.token
          localStorage.setItem('token', token)
          this.$emit('statLogin', true)
        })
        .catch((err) => {
          console.log('masuk err', err)
          this.notif = err.response.data.message
          this.isLogin = false
        })
    },
    logout () {
      localStorage.clear()
      this.$emit('statLogin', false)
    },
    removeErr () {
      this.notif = ''
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-flex;
  margin-left: 60%;
}
.notif {
  position: fixed;
  background: lightsalmon;
  top: 80px;
  right: 10%;
  width: auto;
  height: auto;
  padding: 20px;
}
button {
  background: #2c3e50;
  color: white;
}
.logout-btn {
  margin: 15px 0 4px 88%;
}
div input {
  margin-right: 30px;
  margin-top: 5px;
  padding-left: 7px;
  height: 30px;
  line-height: 35px;
}
div label {
  margin-right: 15px;
  line-height: 35px;
}
button {
  font-size: medium;
  padding: 7px 10px;
  border: none;
  cursor: pointer;
}
</style>
