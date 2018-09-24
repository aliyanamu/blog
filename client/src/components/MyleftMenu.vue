<template>
  <div class="title-list">

    <router-link :to='{name:"myposts"}'><button v-if="isLogin" class="add">+</button></router-link>

    <h1 v-if="!articles">No Article</h1>
    <ul v-else>
      <li v-if="isLogin" v-for="article in articles" :key="article._id">
        <router-link :to='{name:"mydetails", params: {id: `${article._id}`}}'>
          <div class="event-card">
            <img class="post-image" src="https://source.unsplash.com/DnWYw0zLJBg">
            <div class="row">
              <div style="padding: 0.8em 1.3em; max-width: 390px; margin: 0 5%">
                <div>
                  <h3 class="name">{{ article.title }}</h3>
                  <h5 class="date">{{ article.author.name }}</h5>
                </div>
                <div>
                  <p class="desc">{{ article.desc.substring(0, 100) }}...</p>
                  <div class="hide-opt">
                    <router-link class="edit" :to='{name:"editmyposts", params:{id: article._id}}'>Edit</router-link> |
                    <a class="del" @click="delArticle(article._id)">Delete</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'myleft-menu',
  data () {
    return {
      articles: [],
      notif: '',
      baseUrl: 'http://myblog-server.hanabc.xyz'
    }
  },
  props: ['isLogin', 'statUpdArt'],
  methods: {
    getArticles () {
      console.log('masuk sini axios')
      axios
        .get(this.baseUrl + '/articles/personal', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          // sort by title
          response.data.data.sort(function (a, b) {
            let keyA = a.title
            let keyB = b.title
            if (keyA < keyB) return -1
            if (keyA > keyB) return 1
            return 0
          })
          response.data.data.forEach(elem => {
            this.articles.push(elem)
          })
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    delArticle (id) {
      axios
        .delete(this.baseUrl + `/articles/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log('delete success', response.data.message)
          this.$router.push('/articles')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
  created () {
    this.getArticles()
  },
  watch: {
  }
}
</script>

<style scoped>
a, a:hover, a:visited {
  text-decoration: none;
  color: inherit;
}

.add {
  margin: 20px 10%;
  background: #42b983;
  padding: 0.2em 0.7em;
  border-radius: 50%;
  box-shadow: 0 0.1875rem 1.5rem #000;
  font-size: 40px;
}

ul {
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  text-align: left;
  padding: 0 10%;
}

.notif {
  position: fixed;
  background: lightsalmon;
  left: 45%;
  top: 35%;
  width: auto;
  height: auto;
  padding: 20px;
}

.hide-opt .edit:hover {
  color: lightsalmon!important;
}

.hide-opt .del:hover {
  color: red;
}

.event-card {
  display: flex;
  flex-direction: row;
  background: white;
  box-shadow: 0 0.1875rem 1.5rem #000;
  border-radius: 0.375rem;
  margin: 40px 0;
  overflow: hidden;
}

.post-image {
  width: 190px;
  min-height: 220px;
  height: 100%;
  object-fit: cover;
}
</style>
