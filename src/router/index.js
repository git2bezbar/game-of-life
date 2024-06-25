import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RulesView from '../views/RulesView.vue'
import SimulatorView from '../views/SimulatorView.vue'
import WikiView from '../views/WikiView.vue'
import WikiTypeView from '../views/WikiTypeView.vue'
import LoginView from '../views/LoginView.vue'
import KreatorTypeView from '../views/KreatorTypeView.vue'

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
      component: SimulatorView
    },
    {
      path: '/rules',
      name: 'rules',
      component: RulesView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/types',
    },
    {
      path: '/dashboard/types',
      name: 'dashboardTypes',
      component: KreatorTypeView
    }
  ]
})

export default router
