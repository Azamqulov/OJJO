import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
const routes = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/blog/index.vue')
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: () => import('@/views/blog/components/BlogPost.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
