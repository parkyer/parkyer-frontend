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
                            <vs-input  dark state="dark" block v-model="phone" type="number" style="margin-top:5px"/>
                            <p>Metodo de Pago</p>
                            <vs-input  dark state="dark" block v-model="payment_method" type="number" style="margin-top:5px"/>
                            <p>Dirección</p>
                            <vs-input  dark state="dark" block v-model="address" style="margin-top:5px"/>
                        </div>
                        <vs-button dark style="margin:30px auto;width:100%;font-size:20px" @click="verificarInfo" :loading=loading>Crear</vs-button>
                    </div>
                    <vs-button dark size="large" style="margin:20px auto" @click="goAtras">Home 🏠</vs-button>
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
            name:null,
            last_name:null,
            email:null,
            password:null,
            phone:null,
            payment_method:null,
            address:null,
            visible:false,
            loading:false,
            success:false
        }
    },
    methods:{
        goAtras(){
            this.$router.push({name:"home"})
        },
        changeShow(){
            this.show=!this.show
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
                this.registrar()
            }
        },
        registrar(){
            this.loading=true
            this.registerMutation().then(()=>{
            this.loading=false
            if(this.success){
                let color="success"
                let position="top-right"
                this.$vs.notification({
                    color,
                    position,
                    title: 'Registro Exitoso',
                    text: 'Ya puedes iniciar sesión'
                })
                this.$router.push({name:"login"})
            }
            }).catch(error =>{
                this.loading=false
                console.log(error)
                let color="danger"
                let position="top-right"
                this.$vs.notification({
                    color,
                    position,
                    title: 'Error',
                    text: 'datos ingresados incorrectos'
                })
            })
            
        },

        async registerMutation(){
            const result =await this.$apollo.mutate({
            // Mutation
            mutation: gql`mutation ($name: String!,$last_name: String!,$email: String!,$password:String!,$phone: Int!,$payment_method: Int!,$address: String!) {
                crearUsuario(usuario:{name:$name,last_name:$last_name,email:$email,password:$password,phone:$phone,payment_method:$payment_method,address:$address}) {
                id
                name
                last_name
                email
                password
                phone
                payment_method
                address
                }
            }`,
            // Parameters
            variables: {
                name: this.name,
                last_name:this.last_name,
                email: this.email,
                password:this.password,
                phone:parseInt(this.phone),
                payment_method:parseInt(this.payment_method),
                address:this.address
            },
            })
            console.log(result)
            if(result.data.crearUsuario!=null){
                this.success=true
            }
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