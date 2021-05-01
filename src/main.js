import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import Carousel3d from 'vue-carousel-3d';


import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import 'boxicons'

//Vuesax styles
import 'vuesax/dist/vuesax.css'
import 'leaflet/dist/leaflet.css';
import 'boxicons/css/boxicons.min.css'

import { createProvider } from './vue-apollo'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(Carousel3d);
Vue.use(Vuesax, {
  colors: {
    primary:'#6DC62A',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'#00507D'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
