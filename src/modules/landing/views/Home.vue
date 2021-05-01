<template>
    <div class="home">
        <div class="logo-container" align="center">
            <img src="../../../assets/images/logo.jpg" alt="logo" style="width:250px">
        </div>
        <div class="buttons-container">
            <vs-button size="large" style="width:200px" class="button-style" @click="goLogin">Iniciar Sesión</vs-button>
            <vs-button size="large" style="width:200px" class="button-style" @click="goRegister">Registrarse</vs-button>
        </div>
        <p align="center" class="text">¿Buscas Parqueadero?</p>
        <p align="center" class="subtext" style="margin-top:20px" @click="goContact">Contacto</p>
        <p align="center" class="subtext" @click="goAbout">¿Quienes Somos?</p>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        goAbout(){
            this.$router.push({name:"about"})
        },
        goContact(){
            this.$router.push({name:"contact"})
        },
        goLogin(){
            this.$router.push({name:"login"})
        },
        goRegister(){
            this.$router.push({name:"register"})
        },
        beforeEach(){
            if(localStorage.getItem("id")){
                this.$router.push({name:"main"})
            }else{
                console.log("permitido")
            }
        }
    },
    mounted(){
        this.beforeEach()
    } 
}
</script>

<style lang="scss" scoped>

*{
    font-weight: bold;
}

.home{
   min-height: 100vh;
   background: url("../../../assets/images/background.jpg");
   background-position: center;
   background-size: cover;
}

.logo-container{
   padding-top: 100px;
   width: 100%;
}

.buttons-container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.button-style{
    font-size: 20px;
    box-shadow: 1px 4px 5px gray;
}
.text{
    margin-top: 50px;
    font-size: 30px;
    color: #00507D;
}

.subtext{
    cursor:pointer;
    color: #00507D;
}
</style>
