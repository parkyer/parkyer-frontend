<template>
<div class="bar">
  <vs-sidebar
        absolute
        reduce
        v-model="active"
        open
        textWhite
        background="dark"
        >
        <template #logo>
          <img src="../../../assets/images/logo.jpg" alt="parkyer-logo" style="border-radius:10px">
        </template>
        
        <vs-sidebar-item id="home" v-on:click.native="state='home'">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i class='bx bxs-parking'></i>
              </template>
              Parqueaderos
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item id="admin_one" v-on:click.native="state='admin_one'">
            <template #icon>
              <i class='bx bxs-duplicate'></i>
            </template>
            En alquiler
          </vs-sidebar-item>
          <vs-sidebar-item id="admin_two" v-on:click.native="state='admin_two'">
            <template #icon>
              <i class='bx bx-duplicate' ></i>
            </template>
            Alquilados
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-item id="vehiculos" v-on:click.native="state='vehiculos'">
          <template #icon>
            <i class='bx bxs-car' ></i>
          </template>
          Vehiculos
        </vs-sidebar-item>
        <vs-sidebar-item id="mapa" v-on:click.native="state='mapa'">
          <template #icon>
            <i class='bx bxs-map-alt' ></i>
          </template>
          Mapa
        </vs-sidebar-item>
        <vs-sidebar-item id="perfil" v-on:click.native="state='perfil'">
          <template #icon>
            <i class='bx bxs-happy-alt  ' ></i>
          </template>
          Perfil
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right" primary style="cursor:pointer" v-on:click.native="logOut">
              <i class='bx bx-log-in-circle' ></i>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
      <div v-if="state=='home'"><menu-home></menu-home></div>
      <div v-else-if="state=='admin_one'"><admin-one></admin-one></div>
      <div v-else-if="state=='admin_two'"><admin-two></admin-two></div>
      <div v-else-if="state=='vehiculos'"><vehiculos></vehiculos></div>
      <div v-else-if="state=='mapa'"><mapa></mapa></div>
      <div v-else-if="state=='perfil'"><perfil></perfil></div>
      <vs-dialog v-model="dialog">
        <template #header>
        <p> ¿Estas seguro que deseas Salir?</p>
        </template>
          <div class="logout-button-container">
            <vs-button @click="goHome">Si, Cerrar Sesión</vs-button>
            <vs-button @click="dialog=!dialog">No, Continuar</vs-button>
          </div>
      </vs-dialog>
</div>
</template>

<script>
import MenuHome from '../views/MenuHome.vue'
import AdminOne from '../views/AdminOne.vue'
import AdminTwo from '../views/AdminTwo.vue'
import Mapa from '../views/Mapa.vue'
import Vehiculos from '../views/Vehiculos.vue'
import Perfil from '../views/Perfil.vue'
export default{
  components:{
    MenuHome,
    AdminOne,
    AdminTwo,
    Mapa,
    Vehiculos,
    Perfil
  },
  data(){
    return{
      state:"home",
      active:null,
      dialog:false
  }
},
methods:{
  logOut(){
    this.dialog=!this.dialog
  },
  beforeEach(){
            if(localStorage.getItem("id")){
                console.log("permitido")
            }else{
                this.$router.push({name:"home"})
            }
        },
  goHome(){
    localStorage.clear()
    this.$router.push({name:"home"})
  }
},
mounted(){
  this.beforeEach()
}
}

</script>

<style lang="scss" scoped>

.logout-button-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row
}
</style>