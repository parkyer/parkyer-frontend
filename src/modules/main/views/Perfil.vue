<template>
  <div class="main-perfil">
    <div class="container">
      <div class="perfil-container">
        <div style="height:20px"></div>
        <img src="https://img.uefa.com/imgml/TP/players/1/2021/324x324/95803.jpg" alt="foto_perfil" class="avatar">
        <div class="info-container">
          <p style="font-size:16px"><span style="font-weight:bold">Nombre: </span>{{name}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Apellido: </span> {{last_name}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Correo: </span> {{email}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Teléfono: </span> {{phone}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Dirección: </span> {{address}}</p>
          <vs-button style="margin:auto;width:200px;margin-top:10px">Editar Información</vs-button>
          <vs-button dark style="margin:auto;width:200px;margin-top:10px">Cambiar Contraseña</vs-button>
          <vs-button dark style="margin:auto;width:200px;margin-top:10px">Cambiar Metodo de Pago</vs-button>
          <vs-button danger style="margin:auto;width:200px;margin-top:10px">Eliminar Cuenta</vs-button>
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
      name:"Camilo",
      last_name:"Carranza",
      email:"ccarranzac@unal.edu.co",
      password:"contraseña",
      phone:"3197382435",
      payment_method:"141131231",
      address:"direccion 1"
  }
}
}

</script>

<style lang="scss" scoped>
.main-perfil{
  min-height: 100vh;
  background: #CEE1E5;
  padding-left: 70px;
}

.container{
  padding-top: 60px;
  margin:auto;
  width: 40%;
}

.perfil-container{
  width: 100%;
  background-color: #ffff;
  box-shadow: 0px 2px 10px rgb(195, 196, 195);
  border-radius: 10px;
  padding:2px;
}

.avatar{
  width: 150px;
  border-radius:75px;
  display: block;
  margin:auto;
  cursor: pointer;
}

.info-container{
  width: 350px;
  margin: 20px auto;
  p{
    line-height: 30px;
  }
}
</style>