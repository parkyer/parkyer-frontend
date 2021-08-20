<template>
  <div class="main-admin-one">
    <div class="container">
      <p style="font-weight:bold;padding:10px">Parqueaderos en Alquiler</p>
      <div class="buttons-container">
          <vs-button class="button-style" size="large" @click="createModal=!createModal"><i class='bx bx-plus'/> Agregar  </vs-button>
          <!--<vs-button class="button-style" size="large"><i class='bx bx-pencil'/> Editar </vs-button>-->
          <vs-button class="button-style" size="large" @click="deleteModal=!deleteModal"><i class='bx bxs-trash'/> Borrar </vs-button>
      </div>
      <div class="center">
        <vs-table v-model="selected">
          <template #thead>
            <vs-tr>
              <vs-th>
                Id
              </vs-th>
              <vs-th>
                Tipo
              </vs-th>
              <vs-th>
                Ubicación
              </vs-th>
            </vs-tr> 
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(tr, i) in parqueaderos"
              :data="tr"
              :is-selected="selected == tr"
            >
              <vs-td>
                {{tr.id}}
              </vs-td>
              <vs-td>
                {{tr.type}}
              </vs-td>
              <vs-td>
                {{tr.location}}
              </vs-td>
            </vs-tr> 
          </template>
        </vs-table>
      </div>
    </div>
    <!--Dialog Crear Parqueadero-->
    <div class="center">
      <vs-dialog v-model="createModal">
        <template #header>
            <h2 style="color: #00507D;">
              Crear un parqueadero
            </h2>
          </template>
          <div class="con-form">
            <span class="p-float-label">
              <vs-input label-placeholder="Id" primary block v-model="parqueadero.id" ></vs-input>
            </span>
            <br/>
            <span class="p-float-label">
              <vs-input label-placeholder="Latitud" primary block v-model="parqueadero.latitude" ></vs-input>
            </span>
            <br/>
            <span class="p-float-label">
              <vs-input label-placeholder="Longitud" primary block v-model="parqueadero.longitude" ></vs-input>
            </span>
            <br/>
            <span class="p-float-label">
              <vs-input label-placeholder="Ubicación (Dirección)" primary block v-model="parqueadero.location" ></vs-input>
            </span>
            <br/>
            <span class="p-float-label">
              <vs-input label-placeholder="Tipo" primary block v-model="parqueadero.type" ></vs-input>
            </span>
            <br/>
          </div>
          <div class="create-button-container">
            <vs-button @click="crearParqueadero" :loading="loading">Crear</vs-button>
            <vs-button @click="createModal=!createModal">Cancelar</vs-button>
          </div>
      </vs-dialog>
    </div>
    <!--Dialog Borrar Parqueadero-->
    <div class="center">
      <vs-dialog v-model="deleteModal">
        <template #header>
          <p> ¿Deseas borrar este parqueadero? </p>
        </template>
        <div class="create-button-container">
          <vs-button @click="borrar" :loading="loading">Borrar</vs-button>
          <vs-button @click="deleteModal=!deleteModal">Cancelar</vs-button>
      </div>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default{
  components:{
    
  },
  data(){
    return{
      loading: false,
      parqueaderos:null,
      res:null,
      selected:null,
      createModal: false,
      deleteModal: false,
      parqueadero:{
        id: '',
        id_owner: Number,
        id_client: 'null',
        latitude: '',
        longitude: '',
        location: '',
        type: ''
      }
    }
  },
  methods:{
    borrar(){
      this.loading=true
      this.deleteParkingById().then(()=>{
        this.loading=false
        location.reload()
      }).catch(error=>{
        this.loading=false
        let color="danger"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Error al borrar',
          text: error
        })
        this.deleteModal=!this.deleteModal
        console.log(error)
      })
    },
    async deleteParkingById(){
      const result=await this.$apollo.mutate({
        mutation: gql`mutation ($id: Int!){
          deleteParkingById(id: $id)
        }`,
        //Parameters
        variables: {
          id: this.selected.id,
        }
      })
      console.log(result)
    },
    crearParqueadero(){
      this.loading=true
      this.createParking().then(()=>{
        this.loading=false
        location.reload()
      }).catch(error=>{
        this.loading=false
        let color="danger"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Id del parking en uso!',
          text: error
        })
        this.createModal=!this.createModal
        console.log(error)
      })
    },
    async createParking(){
      this.parqueadero.id=Number(this.parqueadero.id)
      const result=await this.$apollo.mutate({
        //Mutation
        mutation: gql`mutation($id: Int!, $id_owner: Int!, $id_client: String!, $latitude: String!, $longitude: String!, $type: String!, $location: String!){
          createParking(parking: {id: $id, id_owner: $id_owner, id_client: $id_client, latitude: $latitude, longitude: $longitude, type: $type, location: $location}){
            id
            id_owner
            id_client
            latitude
            longitude
            type
            location
          }
        }`,
        //Parameters
        variables:{
          id:this.parqueadero.id,
          id_owner:this.parqueadero.id_owner,
          id_client:this.parqueadero.id_client,
          latitude:this.parqueadero.latitude,
          longitude:this.parqueadero.longitude,
          type:this.parqueadero.type,
          location:this.parqueadero.location,
        }
      })
      console.log(result)
    },
    asignarInfo(){
      this.getOwnerParkingLots().then(()=>{
        this.parqueaderos=this.res
        console.log(this.parqueaderos)
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
      this.res=result.data.getOwnerParkingLots
    }
  },
  mounted(){
    this.asignarInfo()
    this.parqueadero.id_owner=parseInt(localStorage.getItem("id"))
  }
}

</script>

<style lang="scss" scoped>
.main-admin-one{
  min-height: 100vh;
  background: rgb(206,225,229);
  background: linear-gradient(180deg, rgba(206,225,229,1) 0%, rgba(223,221,255,1) 10%, rgba(0,255,87,0.3799894957983193) 100%);
  padding-left: 70px;
}

.container{
  position: relative;
  margin:auto;
  width: 80%;
  height: 470px;
  background-color:rgb(230, 237, 238);
  border-radius: 10px;
  top: 70px;
  box-shadow: 0px 2px 10px rgb(197, 197, 197);
}

.buttons-container{
    display: flex;
    width: 100%;
}

.create-button-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row
}
</style>