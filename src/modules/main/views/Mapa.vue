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
          :lat-lng="[4.6458605, -74.0795711]"
          :icon="icon" > </l-marker>
          
        </l-map>
      </div>
      <div class="container-resultados" style="float: right">
        <vs-input  primary state="primary" block v-model="busqueda" style="width:80% ; margin:25px auto"/>
        <div class="resultados">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      iconSize: 64
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
    }
},

}

</script>

<style lang="scss" scoped>
.main-map{
  min-height: 100vh;
  background: #CEE1E5;
  padding-left: 70px;

}

.container{
  padding-top: 100px;
  width: 80%;
  margin:auto;
}

.mapa{
  width: 62%;
  height: 470px;
  background-color: rgb(178, 179, 180);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgb(145, 145, 145);
}
.container-resultados{
  width: 35%;
  height: 470px;
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgb(214, 213, 213);
}
.resultados{
  width: 80%;
  height: 350px;
  background-color: rgb(228, 228, 228);
  margin: auto;
  border-radius: 10px;

}



</style>