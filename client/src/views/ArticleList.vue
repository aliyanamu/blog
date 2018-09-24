<!-- <h2 class="w3-center">Manual Slideshow</h2> --><template>
  <div class="artlist">
    <h1 v-if="!articles">No Article</h1>
    <div v-for="article in articles" :key="article._id" v-else>
      <div class="single-com">
        <h3>{{article.title}}</h3>
        <p style="font-style: italic;">{{article.author.name}}</p>
        <h5>{{article.desc}}</h5>
      </div>
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
      notif: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  props: ['isLogin'],
  methods: {
    noToken () {
      this.notif = 'Login to access menu'
    },
    getArticles () {
      axios
        .get(this.baseUrl + '/articles')
        .then(response => {
          response.data.articles.forEach(elem => {
            this.articles.push(elem)
          })
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    }
  }
}
</script>

<style>
.single-com {
  margin: 5px auto;
  width: 80%;
  padding: 30px 40px 50px;
  height: auto;
  background: #2973b7;
  color: white;
  text-align: left;
  border-radius: 10px;
}
</style>
