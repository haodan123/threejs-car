import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './module/defulte'
// console.log(...routes);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...routes,
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import("@/views/index.vue"),

  },

  ]
})

export default router
