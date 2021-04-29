import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'boxicons'

import 'vuesax/dist/vuesax.css' 

//Vuesax styles
import 'boxicons/css/boxicons.min.css'

Vue.use(Vuesax, {
  colors: {
    primary:'#6DC62A',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
