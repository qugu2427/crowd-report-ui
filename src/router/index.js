import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignOut from '@/views/SignOut.vue'
import Article from '@/views/Article.vue'
import Search from '@/views/Search.vue'
import Tags from '@/views/Tags.vue'
import Meta from '@/views/Meta.vue'
import NotFound from '@/views/NotFound.vue'
import Create from '@/views/Create.vue'
import MyArticles from '@/views/MyArticles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signOut',
    name: 'SignOut',
    component: SignOut
  },
  {
    path: '/articles/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/meta',
    name: 'Meta',
    component: Meta
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/myArticles',
    name: 'MyArticles',
    component: MyArticles
  },
  // 404
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
