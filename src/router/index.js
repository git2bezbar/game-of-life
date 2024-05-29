import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RulesView from '../views/RulesView.vue'
import WikiView from '../views/WikiView.vue'
import WikiTypeView from '../views/WikiTypeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: WikiView
    },
    {
      path: '/wiki/:id',
      name: 'wikiType',
      component: WikiTypeView
    },
    {
      path: '/simulator',
      name: 'simulator',
      component: HomeView
    },
    {
      path: '/rules',
      name: 'rules',
      component: RulesView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
