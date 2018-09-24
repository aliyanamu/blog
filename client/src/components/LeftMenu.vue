<template>
  <div class="title-list">
    <div class="left">
      <form class="search-container">
        <input type="text" id="search-bar" v-model="searchData" placeholder="Search article">
        <a @click="getSearch"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"></a>
      </form>
      <h1 v-if="!articles">No Article</h1>
      <ul v-else>
        <li v-for="article in articles" :key="article._id">
          <router-link :to='{name:"details", params: {id: `${article._id}`}}'>
            <div class="event-card">
              <img class="post-image" src="https://source.unsplash.com/DnWYw0zLJBg">
              <div class="row">
                <div style="padding: 0.8em 1.3em; max-width: 390px; min-width: 300px; margin: 0 5%">
                  <div>
                    <h3 class="name">{{ article.title }}</h3>
                    <h5 class="date">{{ article.author.name }}</h5>
                  </div>
                  <div>
                    <p class="desc">{{ article.desc.substring(0, 100) }}...</p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'left-menu',
  data () {
    return {
      articles: [],
      searchData: '',
      notif: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  props: ['isLogin'],
  methods: {
    getArticles () {
      axios
        .get(this.baseUrl + '/articles')
        .then(response => {
          // sort by title
          response.data.articles.sort(function (a, b) {
            let keyA = a.title
            let keyB = b.title
            if (keyA < keyB) return -1
            if (keyA > keyB) return 1
            return 0
          })
          response.data.articles.forEach(elem => {
            this.articles.push(elem)
          })
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    getSearch () {
      axios
        .get(this.baseUrl + '/articles')
        .then(response => {
          // sort by title
          response.data.articles.sort(function (a, b) {
            let keyA = a.title
            let keyB = b.title
            if (keyA < keyB) return -1
            if (keyA > keyB) return 1
            return 0
          })
          this.articles = []
          response.data.articles.forEach(elem => {
            if (elem.title.match(this.searchData, 'i') || elem.desc.match(this.searchData, 'i') || elem.category.match(this.searchData, 'i')) {
              console.log(elem)
              this.articles.push(elem)
            }
          })
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped>
a, a:hover, a:visited {
  text-decoration: none;
  color: inherit;
}

.left {
  margin-top: 5%
}
.add {
  background: #42b983;
  margin: 20px 0;
  width: 100%;
  line-height: 4;
  font-size: 20px;
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
  width: 180px;
  min-height: 210px;
  height: 100%;
  object-fit: cover;
}

/* search bar */
.search-container {
  /* width: 490px; */
  display: block;
  margin: 0 auto;
}

input#search-bar {
  margin: 0 10%;
  width: 80%;
  height: 45px;
  padding: 0 20px;
  border: 1px solid #D0CFCE;
  outline: none;
}
input#search-bar:focus {
  border: 1px solid #008ABF;
  transition: 0.35s ease;
  color: #008ABF;
}
input#search-bar:focus::-webkit-input-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus::-moz-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus:-ms-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}

.search-icon {
  position: absolute;
  width: 75px;
  height: 75px;
  margin-top: -15px;
  right: 10%;
}

</style>
