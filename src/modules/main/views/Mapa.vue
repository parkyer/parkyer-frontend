<template>
  <div class="main-map">
    <div class="container">
      <div class="mapa" style="float: left">
        <l-map
          style="height: 100%; width: 100%; border-radius:10px"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker 
            v-for="parking in parkingLots"
            :key="parking.id"
            :lat-lng="[parking.latitude, parking.longitude]"
            :icon="icon"
            @click="selectedParking(parking.id)" > </l-marker>
          
        </l-map>
      </div>
      <div class="container-resultados" style="float: right">
        <vs-input  
          primary state="primary"
          icon-after
          block
          v-model="busqueda"
          style="width: 80%; margin:20px auto"
           @click-icon="search"
        >
          <template #icon>
            <i class='bx bx-search-alt'></i>
          </template>
        </vs-input>
        <div class="title">
          <p>
            <span style="margin-left:40px">Parking</span>
            <span style="margin-right:20px">Tipo</span>
          </p>
        </div>
        <div class="resultados">
          <div  class="item" v-for="parking in parkingLots" :key="parking.id" @click="selectedParking(parking.id)">
            <p>
              <span style="width:40%" >{{parking.location}} </span>
              <span>|</span>
              <span >{{parking.type}}
                <i v-if="parking.type=='carro'" class='bx bxs-car-garage'></i>
                <i v-else class='bx bx-cycling'></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <vs-dialog v-model="suscriptionModal">
      <template #header>
        <p> ¿Deseas reservar este parqueadero: </p>
      </template>
      <div class="sus-button-container">
        <vs-button @click="reservar" :loading=loading>Reservar</vs-button>
        <vs-button @click="suscriptionModal=!suscriptionModal">Cancelar</vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";
import L from 'leaflet';
import { LMap, LTileLayer, LMarker} from 'vue2-leaflet';
//import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';

export default{
  components:{
    LMap,
    LTileLayer,
    LMarker
  },
  data(){
    return{
      busqueda:null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [4.6486259, -74.1492351],
      bounds: null,
      icon: L.icon({
        iconUrl:require('../../../assets/images/marker.svg'),
  
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [37, 37],
      iconSize: 64,
      res:null,
      parkingLots:[],
      filterParkingLots:[],
      suscriptionModal: false,
      selectedId: Object,
      loading: false
  }
},
methods:{
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    search(){
      this.filterParkingLots=[]
      if(this.busqueda!=null && this.busqueda.length!="+"){
        for(let i=0;i < this.res.length;i++){
          let dir=String(this.res[i].location)
          if(dir.includes(String(this.busqueda))){
            console.log('coincidencia')
            this.filterParkingLots.push(this.res[i]) 
        }
        this.parkingLots=this.filterParkingLots
      }
      }else{
        console.log(this.res)
        this.parkingLots=this.res
      }
      
    },
    selectedParking(id){
      for(let i=0;i<this.parkingLots.length;i++){
        if(id== this.parkingLots[i].id){
          console.log(this.parkingLots[i].id)
          this.selectedId=this.parkingLots[i]
          this.suscriptionModal=!this.suscriptionModal
        }
      }
    },
    reservar(){
      this.loading=!this.loading
      this.newSuscription().then(()=>{
        this.loading=!this.loading
        let color="success"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Parqueadero Reservado Correctamente',
          text: 'cambios aplicados correctamente'
        })
        location.reload()
        this.suscriptionModal=!this.suscriptionModal
      }).catch(error=>{
        this.loading=!this.loading
        //notificacion de error
        let color="danger"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Error',
          text: error
        })
        //cerrar el modal
        this.suscriptionModal=!this.suscriptionModal,
        this.selectedId={}
      })
    },
    async newSuscription(){
       let user_id=parseInt(localStorage.getItem("id"))
      const result=await this.$apollo.mutate({
        mutation: gql`mutation ($id: Int!, $idClient: String!){
          newSuscription(id: $id, client:{ id_client: $idClient}){
            id_client
          }
        }`,
        //Parameters
        variables: {
          id: this.selectedId.id,
          idClient: user_id
        }
      })
      console.log(result)
    },
    asignarInfo(){
      this.getAvailableParkings().then(()=>{
        this.parkingLots=this.res
      }).catch(error=>{
        console.log(error)
      })
    },
    async getAvailableParkings(){
      const result=await this.$apollo.query({
        // Query
        query: gql`
          query {
            getAvailableParkings{
              id
              id_owner
              id_client
              latitude
              longitude
              location
              type
            }
          }
        `,
      });
      console.log(result.data.getAvailableParkings);
      this.res=result.data.getAvailableParkings
    }
},
mounted(){
  this.asignarInfo()
}

}

</script>

<style lang="scss" scoped>
.main-map{
  min-height: 100vh;
  background: rgb(206,225,229);
  background: linear-gradient(180deg, rgba(206,225,229,1) 0%, rgba(223,221,255,1) 10%, rgba(0,255,87,0.3799894957983193) 100%);
  padding-left: 70px;

}

.container{
  padding-top: 100px;
  width: 80%;
  margin:auto;
}

.mapa{
  width: 62%;
  height: 480px;
  background-color: rgb(178, 179, 180);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgb(145, 145, 145);
}
.container-resultados{
  width: 35%;
  height: 480px;
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgb(214, 213, 213);
}

.title{
  width: 80%;
  margin:10px auto;

  p{
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
}

.resultados{
  width: 80%;
  height: 350px;
  margin: auto;
  border-radius: 10px;
  overflow: auto;
}

.item{
  background-color: rgb(233, 229, 229);
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  p{
    display: flex;
    justify-content: space-between;
  }
}

.item:hover{
  background-color: rgb(232, 248, 232);
  box-shadow: 0px 2px 10px rgb(214, 213, 213);
  padding: 15px;
}

.sus-button-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row
}


</style>