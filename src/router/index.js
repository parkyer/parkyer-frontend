import Vue from 'vue'
import VueRouter from 'vue-router'

//import all views
import NotFound from '../ui/NotFound.vue'
import Home from '../modules/landing/views/Home.vue'
import Contacto from '../modules/landing/views/Contacto.vue'
import About from '../modules/landing/views/About.vue'
import InicioSesion from '../modules/auth/views/InicioSesion.vue'
import Registro from '../modules/auth/views/Registro.vue'
import MenuBar from '../modules/main/layout/MenuBar.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home  },
  { path: '*', name:'not_found', component: NotFound },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name:'contact', component: Contacto },
  { path:'/login',name:'login',component: InicioSesion},
  { path:'/register',name:'register',component: Registro},
  { path:'/main',name:'main',component: MenuBar},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
