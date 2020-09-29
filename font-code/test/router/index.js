import Vue from 'vue'
import Router from 'vue-router'

import routes from './router.config'
Vue.use(Router)

console.log('routes', routes)

const createRoute = (routes) => {
  return routes.reduce((total, currentRoute) => {
    total.push(processRouteObj(currentRoute))
    return total
  }, [])
}

const processRouteObj = ({name, component, children, keepAlive, ...args }) => {
  return {
    meta: { name,keepAlive },
    component: () => import(`@/page/${component}`),
    children: children ? createRoute(children) : [],
    ...args
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,  // '/'
  routes: createRoute(routes)
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router