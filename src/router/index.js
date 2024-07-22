import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RulesView from '../views/RulesView.vue'
import SimulatorView from '../views/SimulatorView.vue'
import WikiView from '../views/WikiView.vue'
import WikiTypeView from '../views/WikiTypeView.vue'
import WikiSingleView from '../views/WikiSingleView.vue'
import LoginView from '../views/LoginView.vue'
import KreatorTypeView from '../views/KreatorTypeView.vue'
import KreatorConfigView from '../views/KreatorConfigView.vue'

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
      path: '/wiki/:id:/:patternId',
      name: 'wikiSingle',
      component: WikiSingleView
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
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const jwtToken = document.cookie.split(';').find(cookie => cookie.includes('jwtToken'));
        if (jwtToken) {
          next({ name: 'dashboard' });
        } else {
          next();
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/types',
    },
    {
      path: '/dashboard/types',
      name: 'dashboardTypes',
      component: KreatorTypeView,
      beforeEnter: (to, from, next) => {
        const jwtToken = document.cookie.split(';').find(cookie => cookie.includes('jwtToken'));
        if (!jwtToken) {
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/dashboard/configurations',
      name: 'dashboardConfigurations',
      component: KreatorConfigView,
      beforeEnter: (to, from, next) => {
        const jwtToken = document.cookie.split(';').find(cookie => cookie.includes('jwtToken'));
        if (!jwtToken) {
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
  ]
})

export default router
