<template>
    <div class="about">
        <div class="buttons-container"><br>
            <vs-button gradient @click="goHome" size="large" animation-type="scale" >
                <i class='bx bx-arrow-back bx-sm' ></i>    
                <template #animate >
                    <i class='bx bx-arrow-back bx-sm bx-tada'></i>               
                </template>
            </vs-button>   
        </div>
        <div class="container">
            <div class="logo-container" align="center">
                <img src="../../../assets/images/logo.jpg" alt="logo" style="width:90px">
            </div><br>
            <div class="container-text">
                 <vs-alert relief align="center" style="font-size: 18px; position:relative; width: 90%; left:5%;">
                     <b>Parkyer</b> es una plataforma para el <b> alquiler de parqueaderos </b> en el que el usuario asume el rol de 
                    propietario, ofreciendo el espacio que tenga disponible para el alquiler, o el rol de cliente, 
                    conectando con el propietario  para hacer uso de este espacio en el tiempo que lo solicite.
                </vs-alert><br><br>
            </div>
            <vs-row justify="center">
                <vs-col w="3">
                    <vs-card type="4">
                        <template #title>
                            <h1 style="color: #00507D" align="center" >¿Buscas Parqueadero?</h1>
                        </template>
                        <template #img>
                            <img src="../../../assets/images/maps.png" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                            Parkyer lo hace por ti. La manera más rápida de encontrar parqueadero
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                </vs-col>
                <vs-col w="3">
                    <vs-card type="4">
                        <template #title>
                            <h1 style="color: #00507D" align="center" >Pagos</h1>
                        </template>
                        <template #img>
                            <img src="../../../assets/images/pay.png" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                                Gana dinero con tu parqueadero. Parkyer cuenta con un sistema de pagos.
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                </vs-col>
                <vs-col w="3">
                    <vs-card type="4">
                        <template #title>
                            <h1 style="color: #00507D" align="center" >Control</h1>
                        </template>
                        <template #img>
                            <img src="../../../assets/images/control.png" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                                Con nuestra plataforma podrás administrar el ingreso de los usuarios a los parqueaderos.
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                </vs-col>
            </vs-row>
            <br><footer>PeterParkyer Copyright &copy; 2021</footer>
        </div>
    </div>
</template>


<script>
export default{
    data(){
        return{
            active: false
        }
    },
    methods:{
        goHome(){
            console.log("click")
            this.$router.push({name:"home"})
        }
    }    
}
</script>

<style scoped>

*{
    font-weight: bold;
}

.about{
    background: url("../../../assets/images/background.jpg") no-repeat;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
}
.container{
    position: relative;
    top: -30px;  
}
.text{
    font-size: 20px;
    color: #00507D;
}

b{
    font-weight: bold;
}

footer {
  font-family: Consolas;
  font-size: 15px;
  position: relative;
  width: 20%;
  left: 39%;
  color: #003858;
}
</style>