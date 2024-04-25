import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/muenchner-sicherheitskoeffizient',
      name: 'munich-safety',
      component: () => import('../views/SafetyView.vue')
    },
    {
      path: '/muenchner-bemessung',
      name: 'munich',
      component: () => import('../views/MunichView.vue')
    },
    {
      path: '/maurer-schema',
      name: 'maurer',
      component: () => import('../views/MaurerView.vue')
    },
    {
      path: '/koelner-algorithmus',
      name: 'cologne',
      component: () => import('../views/CologneView.vue')
    },
    {
      path: '/berliner-modell',
      name: 'berlin',
      component: () => import('../views/BerlinView.vue')
    },
    {
      path: '/gefaehrdungsanalyse',
      name: 'risk',
      component: () => import('../views/MunichView.vue')
    }
  ]
})

export default router
