<template>
  <div class="main-map">
    <div class="container">
      <div class="caja" style="float: left"></div>
      <div class="caja" style="float: right"></div>
    </div>
    <div class="container2"></div>
  </div>
</template>

<script>
export default{
  components:{
    
  },
  data(){
    return{
      
  }
}
}

</script>

<style lang="scss" scoped>
.main-map{
  min-height: 100vh;
  background: cadetblue;
  padding-left: 70px;
}

.container{
  padding-top: 100px;
  width: 80%;
  margin:auto;
}

.caja{
  width: 40%;
  height: 200px;
  background-color: cornflowerblue;
}


.container2{
  width: 80%;
  margin: 250px auto;
  height: 300px;
  background-color: crimson;
}
</style>