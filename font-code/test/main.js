import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from '../store'

Vue.use(ElementUi)
Vue.config.productionTip = false

console.log('router', router)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app1')
