import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('./views/Article.vue'),
      children: [
        {
          path: '/articles/:id',
          name: 'details',
          component: () => import('./views/ArticlePage.vue')
        }
      ]
    },
    {
      path: '/my-articles',
      name: 'personals',
      component: () => import('./views/MyArticle.vue'),
      children: [
        {
          path: '/my-articles/:id',
          name: 'mydetails',
          component: () => import('./views/ArticlePage.vue')
        },
        {
          path: '/my-articles/create',
          name: 'myposts',
          component: () => import('./views/CreatePage.vue')
        },
        {
          path: '/my-articles/edit/:id',
          name: 'editmyposts',
          component: () => import('./views/EditPage.vue'),
          props: true
        }
      ]
    }
  ]
})
