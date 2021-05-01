<template>
  <div class="main-map">
    <div class="container">
      <div class="mapa" style="float: left"></div>
      <div class="container-resultados" style="float: right">
        <vs-input  primary state="primary" block v-model="busqueda" style="width:80% ; margin:25px auto"/>
        <div class="resultados">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  components:{
    
  },
  data(){
    return{
      busqueda:null
      
  }
}
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