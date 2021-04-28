<template>
    <div class="register">
        <div class="register-container">
            <transition name="bounce">
                <div v-if="show" class="register-form">
                    <div class="column">
                        <p align="center" class="text">REGISTRARSE</p>
                        <div class="form-container">
                            <p>Nombre</p>
                            <vs-input  dark state="dark" block v-model="name" style="margin-top:5px"/>
                            <p>Apellido</p>
                            <vs-input  dark state="dark" block v-model="last_name" style="margin-top:5px"/>
                            <p>Correo</p>
                            <vs-input  dark state="dark" block v-model="email" style="margin-top:5px"/>
                            <p>Contraseña</p>        
                            <vs-input  dark state="dark" block v-model="password" type="password" style="margin-top:5px"/>
                            <p>Teléfono</p>
                            <vs-input  dark state="dark" block v-model="phone" style="margin-top:5px"/>
                            <p>Metodo de Pago</p>
                            <vs-input  dark state="dark" block v-model="payment_method" style="margin-top:5px"/>
                            <p>Dirección</p>
                            <vs-input  dark state="dark" block v-model="address" style="margin-top:5px"/>
                        </div>
                        <vs-button dark style="margin:30px auto;width:100%;font-size:20px" @click="verificarInfo">Crear</vs-button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            show:false,
            name:null,
            last_name:null,
            email:null,
            password:null,
            phone:null,
            payment_method:null,
            address:null,
            visible:false
        }
    },
    methods:{
        changeShow(){
            this.show=!this.show
        },
        consumirServicio(){
            console.log("asfaf")
        },
        verificarInfo(){
            if(this.name==null || this.last_name==null || this.email==null ||this.password==null ||this.phone==null ||this.payment_method==null || this.address==null 
                || this.name=="" || this.last_name=="" || this.email=="" ||this.password=="" ||this.phone=="" ||this.payment_method=="" || this.address=="   "){
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
                this.autenticar()
            }
        },
        autenticar(){
            let exito=false;
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
                    text: 'Revisa los datos ingresados'
                })
            }
        }
    },
    mounted(){
        this.changeShow()
    }
    
}
</script>

<style lang="scss" scoped>

.register{
    min-height: 100vh;
    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,80,125,1) 0%, rgba(255,255,255,1) 30%);
}

.register-container{
    padding-top:130px;
    margin: auto;
    width: 500px;
}

.register-form{
    width: 100%;
    height: 450px;
    background-color: #ffff;
    border-radius: 10px;
    box-shadow: 0px 2px 20px rgba(0,80,125,1);
}

.column{
    margin: auto;
    width: 60%;
    height: 100%;
}

.text{
    padding-top: 20px;
    font-size: 45px;
    font-weight: bold;
    color: #00507D;
}

.form-container{
    width: 100%;
    height: 270px;
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

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #00507D;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #ffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #00507D;
  border-radius: 20px;
  border: 3px solid #ffff;
}
</style>