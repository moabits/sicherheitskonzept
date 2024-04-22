import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/muenchner-sicherheitskoeffizient',
      name: 'munich-safety',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/muenchner-bemessung',
      name: 'munich',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/maurer-schema',
      name: 'maurer',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/koelner-algorithmus',
      name: 'koeln',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/berliner-modell',
      name: 'berlin',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/gefaehrdungsanalyse',
      name: 'risk',
      component: () => import('../views/MunichView.vue')
    }
  ]
})

export default router
