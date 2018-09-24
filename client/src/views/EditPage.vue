<template>
  <div class="form">
    <input id="title" type="text" placeholder="Input title here" v-model="article.title">
    <textarea id="desc" rows="12" cols="50" placeholder="Write here" v-model="article.desc"></textarea>
    <input id="category" type="text" name="category" placeholder="Add category here" v-model="article.category">
    <button @click="editPost">Edit</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'edit-page',
  data () {
    return {
      title: '',
      desc: '',
      author: '',
      category: '',
      notif: '',
      article: {},
      baseUrl: 'http://myblog-server.hanabc.xyz'
    }
  },
  methods: {
    firstInput () {
      axios
        .get(this.baseUrl + `/articles/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.article = response.data.article[0]
          this.title = response.data.article[0].title
          this.desc = response.data.article[0].desc
          this.category = response.data.article[0].category
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    editPost () {
      axios({
        method: 'PUT',
        url: this.baseUrl + `/articles/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.article.title,
          desc: this.article.desc,
          category: this.article.category
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
    this.firstInput()
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
