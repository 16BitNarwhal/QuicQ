import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router