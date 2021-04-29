<template>
<div class="login">
    <div class="login-container">
        <transition name="bounce">
        <div v-if="show" class="login-form">
            <div class="column">
                <p align="center" class="text">INICIAR SESIÓN</p>
                 <div class="form-container">
                          <p>Correo</p>
                          <vs-input  primary state="primary" block v-model="correo" style="margin-top:5px"/>
                          <p>Contraseña</p>        
                         <vs-input  primary state="primary" block v-model="password" type="password" style="margin-top:5px"/>
                 </div>
                <vs-button primary style="margin:20px auto;width:100%;font-size:20px" @click="verificarInfo">Ingresar</vs-button>
                <p>¿No tienes cuenta? <span style="color:#6FC629;cursor:pointer" @click="goRegister">Registrate ahora</span></p>
            </div>
            <vs-button primary size="large" style="margin:20px auto" @click="goAtras">Home 🏠</vs-button>
        </div>
        </transition>
    </div>       
</div>

 
</template>

<script>
import gql from 'graphql-tag'

export default{
    data(){
        return{
            show:false,
            correo:null,
            password:null,
            visible:false
        }
    },
    methods:{
         goAtras(){
            this.$router.push({name:"home"})
        },
        goRegister(){
            this.$router.push({name:"register"})
        },
        changeShow(){
            this.show=!this.show
        },
        verificarInfo(){
            if(this.correo==null  || this.password==null || this.correo=="" || this.password==""){
                console.log("llenar todos los campos")
                let color="warn"
                let position="top-right"
                this.$vs.notification({
                    color,
                    position,
                    title: 'Advertencia',
                    text: 'Por favor llene todos los campos correspondientes'
                })
            }else{
                this.loginMutation()
            }
        },
        autenticar(){
            let exito=true;
            if(exito){
                let color="success"
                let position="top-right"
                this.$vs.notification({
                    color,
                    position,
                    title: 'Bienvenido',
                    text: 'Inicio de Sesión exitoso'
                })
            }else{
                let color="danger"
                let position="top-right"
                this.$vs.notification({
                    color,
                    position,
                    title: 'Error',
                    text: 'Usuario o Contraseña incorrectos'
                })
            }
        },
        async loginMutation(){
            const result =this.$apollo.mutate({
            // Mutation
            mutation: gql`mutation ($correo: String!,$password:String!) {
                iniciarSesion(login:{email:$correo,password:$password}) {
                access
                }
            }`,
            // Parameters
            variables: {
                correo: this.correo,
                password:this.password
            },
            })
            console.log(result)
        }
    },
    mounted(){
        this.changeShow()
    }
    
}
</script>

<style lang="scss" scoped>


.login{
    min-height: 100vh;
    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(109,198,42,1) 0%, rgba(255,255,255,1) 30%);
}

.login-container{
    padding-top:130px;
    margin: auto;
    width: 500px;
}

.login-form{
    width: 100%;
    height: 370px;
    background-color: #ffff;
    border-radius: 10px;
    box-shadow: 0px 2px 20px rgb(0, 184, 15);
}

.column{
    margin: auto;
    width: 60%;
    height: 100%;
}

.text{
    padding-top: 60px;
    font-size: 40px;
    font-weight: bold;
    color: #6FC629;
}

.form-container{
    width: 100%;
    //background-color: blue;
    overflow-y: auto;
    overflow-x: hidden;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>