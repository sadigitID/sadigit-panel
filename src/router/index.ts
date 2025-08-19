import AgendaPage from '@/pages/agenda/AgendaPage.vue'
import ComponentsPage from '@/pages/ComponentsPage.vue'
import MonitoringProjectPage from '@/pages/monitoringProject/MonitoringProjectPage.vue'
import OurApps from '@/pages/ourApp/OurAppPage.vue'
import PenawaranKontrakPage from '@/pages/penawaranKontrak/PenawaranKontrakPage.vue'
import loginPage from '@/pages/login/loginPage.vue'
import Cookies from 'js-cookie'


import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'agenda',
      component: AgendaPage,
      meta: { requiresAuth: true }
    },
    {

      path: '/components',
      name: 'components',
      component: ComponentsPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/monitoring-project',
      name: 'monitoring project',
      component: MonitoringProjectPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/our-apps',
      name: 'our apps',
      component : OurApps,
      meta: { requiresAuth: true }
    },
    {
      path: '/penawaran-kontrak',
      name: 'penawaran kontrak',
      component: PenawaranKontrakPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
