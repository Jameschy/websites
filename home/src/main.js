import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false

Vue.use(ElementUI,VueRouter,{locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
