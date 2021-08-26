<template>
  <div class="main-home">
    <div class="container">
      <div class="caja1" style="float: left">
        <p style="font-weight:bold">Parqueaderos en Uso</p>
        <carousel-3d 
          class="carousel"
          :width="300"
          :height="160"
          style="margin-top:10px"
          :autoplay="true"
          :autoplay-timeout="1500"
          v-show="pAlquilados.length!=0">
        <slide v-for="(p,i) in pAlquilados" :key="i" :index="i" class="slider">
          <div class="slider-div">
            <p>Id: {{p.id}}</p>
            <p>Tipo: {{p.type}}</p>
            <p>Ubicación: 
              <span style="font-weight:bold; font-size:20px">{{p.location}}</span>
            </p>
          </div>
        </slide>
      </carousel-3d>
      <div v-show="pAlquilados.length == 0">No Hay parqueaderos Reservados</div>
      </div>
      <div class="caja2" style="float: right" >
        <p style="font-weight:bold">Parqueaderos en Alquiler</p>
        <carousel-3d 
          class="carousel"
          :width="300"
          :height="160"
          style="margin-top:10px"
          :autoplay="true"
          :autoplay-timeout="1500"
          v-show="pEnAlquiler.length!=0"
          >
            <slide v-for="(p,i) in pEnAlquiler" :key="i" :index="i" class="slider">
              <div class="slider-div">
                <p>Id: {{p.id}}</p>
                <p>Tipo: {{p.type}}</p>
                <p>Ubicación: 
                  <span style="font-weight:bold; font-size:20px">{{p.location}}</span>
                </p>
              </div>
            </slide>
      </carousel-3d>
      <div v-show="pEnAlquiler.length == 0">No Hay parqueaderos Reservados</div>
      </div>
    </div>
    <div class="container2">
      <vs-table v-if="Regs != null">
        <template #thead>
          <vs-tr>
            <vs-th> Parqueadero </vs-th>
            <vs-th> Tipo </vs-th>
            <vs-th> Fecha </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(Regs, page, max)"
            :data="tr"
          >
            <vs-td>
              {{ tr.ParkingId }}
            </vs-td>
            <vs-td>
              {{ tr.Type }}
            </vs-td>
            <vs-td>
              {{ tr.Date }}
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(Regs, max)" />
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  components:{
    Carousel3d,
    Slide
  },
  data: () => ({
    page: 1,
    max: 5,
    card: 6,
    user: null,
    Regs: null,
    res: null,
    res2: null,
    pAlquilados: [],
    pEnAlquiler: []
  }),
  methods: {

    parqueaderosEnAlquiler(){
      this.getOwnerParkingLots().then(()=>{
        this.pEnAlquiler=this.res2
        console.log(this.pEnAlquiler)
      }).catch(error=>{
        console.log(error)
      })
    },
    async getOwnerParkingLots(){
      let user_id=parseInt(localStorage.getItem("id"))
      const result=await this.$apollo.query({
        //Query
        query:gql`
          query($id: Int!){
             getOwnerParkingLots(id: $id){
                id
                id_owner
                id_client
                latitude
                longitude
                location
                type
             }
          }
        `,
        //Parameters
        variables:{
          id: user_id
        }
      })
      this.res2=result.data.getOwnerParkingLots
    },
    parqueaderosReservados(){
      this.getParkingsUsedBy().then(()=>{
        this.pAlquilados=this.res
        console.log(this.pAlquilados)
      }).catch(error=>{
        console.log(error)
      })
    },
    async getParkingsUsedBy(){
      let user_id=parseInt(localStorage.getItem("id"))
      const result= await this.$apollo.query({
        //Query
        query:gql`
          query($id: Int!){
             getParkingsUsedBy(id: $id){
                id
                id_owner
                id_client
                latitude
                longitude
                location
                type
             }
          }
        `,
        //PArameters
        variables:{
          id: user_id
        }
      })
      this.res=result.data.getParkingsUsedBy
    },
    async registersQuery() {
      const result = await this.$apollo.query({
        // Query
        query: gql`
          query($user: Int!) {
            getRegisterUser(user: $user) {
              ParkingId
              Type
              Date
            }
          }
        `,
        // Parameters
        variables: {
          user: this.user,
        },
      });
      console.log(result.data.getRegisterUser);
      this.Regs = result.data.getRegisterUser;
    },
  },
  mounted() {
    this.user=parseInt(localStorage.getItem("id"))
    this.registersQuery();
    this.parqueaderosReservados();
    this.parqueaderosEnAlquiler()
  },
};
</script>

<style lang="scss" scoped>
.main-home {
  min-height: 100vh;
  background: rgb(206,225,229);
  background: linear-gradient(180deg, rgba(206,225,229,1) 0%, rgba(223,221,255,1) 10%, rgba(0,255,87,0.3799894957983193) 100%);
  padding-left: 70px;
}
.container {
  padding-top: 100px;
  width: 80%;
  margin: auto;
}

.caja1 {
  width: 49%;
  height: 220px;
  //background-color: cornflowerblue;
  border-radius: 10px;
}
.caja2 {
  width: 49%;
  height: 220px;
  //background-color: rgb(197, 19, 241);
  border-radius: 10px;
}

.container2 {
  width: 80%;
  margin: 250px auto;
  background-color: rgb(231, 231, 231);
  box-shadow: 0px 2px 10px rgb(197, 197, 197);
  border-radius: 10px;
}

.slider{
  border-radius: 10px;
  border-style: hidden;
  border-color:rgb(187, 194, 192);
  background-color: rgba(187, 194, 192, 0.5);
}

.slider-div{
  width: fit-content;
  margin-left: 20%;
  margin-top: 10%;

}


</style>
