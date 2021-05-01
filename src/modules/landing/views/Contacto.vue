<template>
    <div class="contact">
        <div class="buttons-container"><br>
            <vs-button gradient @click="goHome" size="large" animation-type="scale" >
                <i class='bx bx-arrow-back bx-sm' ></i>    
                <template #animate >
                    <i class='bx bx-arrow-back bx-sm bx-tada'></i>               
                </template>
            </vs-button><br><br>       
        </div>
        <div class="logo-container" align="center">
            <img src="../../../assets/images/logo.jpg" alt="logo" style="width:250px"><br><br>
            <br><br><br><footer>PeterParkyer Copyright &copy; 2021</footer>
        </div>

<!--Datos-->
        <section>
            <div class="info">
                <div class="row">
                    <div >
                        <i class='bx bx-map bx-md bx-tada' style='color:#6DC62A'  ></i>
                        <p class="text">
                            Carrera 45 N° 26-85, Bogotá
                        </p>
                    </div>
                    <div>
                        <i class='bx bxs-phone bx-md bx-tada' style='color:#6DC62A'></i>
                        <p class="text">
                            +57 301 768 95 50
                        </p>
                    </div>
                    <div >
                        <i class='bx bxs-envelope bx-md bx-tada' style='color:#6DC62A'></i>
                        <p class="text">
                            peter@parkyer.com.co
                        </p>
                    </div>
                </div>
            </div>
        </section>


<!--Integrantes-->  

      <div class="center">
        <vs-button  @click="active=!active" gradient style="position:relative; font-size: 23px; width: 30%; left: 60%; top: -150px;">
          Integrantes
        </vs-button>
        <vs-dialog blur v-model="active">
          <template #header>
            <h1 class="not-margin" >
              Integrantes
            </h1>
          </template>

          <div class="center examplex">
            <vs-table striped>
              <template #thead>
                <vs-tr>
                  <vs-th>
                    Nombre
                  </vs-th>
                  <vs-th>
                    Correo
                  </vs-th>
                  <vs-th>
                    Contacto
                  </vs-th>
                </vs-tr>
              </template>
              
              <template #tbody>
                <vs-tr
                  :key="i"
                  v-for="(tr, i) in users"
                  :data="tr">
                  <vs-td>
                    {{ tr.name }}
                  </vs-td>
                  <vs-td>
                    {{ tr.email }}
                  </vs-td>
                  <vs-td>
                      <vs-button color="#edf2f5" gradient :href="tr.website" blank>
                          <i class='bx bxl-github bx-xs' style='color:#000000'  ></i>
                      </vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-dialog>
      </div>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                active: false,
                users: [
          {
            
            "name": "Santiago Arias",
            "email": "saariasba@unal.edu.co",
            "website": "https://github.com/Saariasba",
          },
          {
            "name": "Camilo Carranza",
            "email": "ccarranzac@unal.edu.co",
            "website": "https://github.com/ccarranzac",
          },
          {
            "name": "Camilo Chaparro",
            "email": "caachaparrosi@unal.edu.co",
            "website": "https://github.com/caachaparrosi",
          },
          {
            "name": "Elkin Mendez",
            "email": "emmendezp@unal.edu.co",
            "website": "https://github.com/ElkinMauricio",
          },
          {
            "name": "Julio Muñoz",
            "email": "jjmunozq@unal.edu.co",
            "website": "https://github.com/jjmunozq",
          },
          {
            "name": "Andrés Ortega",
            "email": "aortegaf@unal.edu.co",
            "website": "https://github.com/aortegaf",
          },
          {
            "name": "Sebastian Reina",
            "email": "jreinaz@unal.edu.co",
            "website": "https://github.com/jreinaz",
          }
        ]

            }
        },
        methods:{
            goHome(){
                console.log("click")
                this.$router.push({name:"home"})
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

.contact{
   min-height: 100vh;
   background: url("../../../assets/images/background.jpg");
   background-position: center;
   background-size: cover;
}

.info{
    position: relative;
    width: 40%;
    margin-top: -380px;
    display: flex;
    left: 24%;
}

.logo-container{
   padding-top: 30px;
   width: 20%;
}

.text{
    position: relative;
    font-size: 25px;
    color: #00507D;
    top: -38px;
    left: 20%;
}
.text2{
    position: relative;
    font-size: 20px;
    color: #03324d;
}
.not-margin{
    margin: 0px;
    font-weight: normal;
    padding: 10px;
    color: #6DC62A;
}

a{
    font-size: .8rem;
    opacity: .7;
    opacity: 1;
}

.vs-input-content{
    margin: 10px 0px;
    width: calc(100%);
}
.vs-input{
    width: 100%;
}
.footer-dialog{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);
}

footer {
  font-family: Consolas;
  font-size: 20px;
  color: #00507D;
  position: relative;
  bottom: 20px;
  top: -20px;
}

</style>

