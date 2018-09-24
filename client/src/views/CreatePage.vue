<template>
  <div class="form">
    <h1 class="title">Make your post here!</h1>
    <input id="title" v-model="title" type="text" name="title" placeholder="Input title here">
    <textarea id="desc" v-model="desc" rows="12" cols="50" name="desc" placeholder="Write here"></textarea>
    <input id="category" v-model="category" type="text" name="category" placeholder="Add category here">
    <button @click="createPost">Create</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'create-page',
  data () {
    return {
      title: '',
      desc: '',
      author: '',
      category: '',
      notif: '',
      baseUrl: 'http://myblog-server.hanabc.xyz'
    }
  },
  methods: {
    createPost () {
      axios({
        method: 'POST',
        url: this.baseUrl + `/articles`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          desc: this.desc,
          category: this.category
        }
      })
        .then(response => {
          this.notif = response.data.message
          this.$router.push('/articles')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
  created () {
  },
  computed: {
  }
}
</script>

<style scoped>
.form {
  padding-top: 8%;
}

.title {
  text-align: left;
  margin: 0 0 5% 10%;
}
input, textarea {
  width: 80%;
  border: 1px solid lightgrey;
  padding: 10px;
  margin: 0 10% 20px;
}

button {
  float: right;
  margin-right: 10%;
  width: 100px;
  height: 50px;
}
</style>
