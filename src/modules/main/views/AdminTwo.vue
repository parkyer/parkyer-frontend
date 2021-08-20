<template>
  <div class="main-admin-two">
    <div class="container">
      <p style="font-weight:bold;padding:10px">Parqueaderos Alquilados</p>
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
              <template #expand>
                <div>
                  <vs-button :loading=loading border @click="cancelarReserva">
                    Cancelar Reserva
                  </vs-button>
                </div>
              </template>
            </vs-tr>            
          </template>
        </vs-table>
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
      parqueaderos:null,
      res:null,
      selected:null,
      loading: false
    }
  },
  methods:{
    cancelarReserva(){
      this.loading=true
      this.deleteSuscription().then(()=>{
        this.loading=false
        let color="success"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Reserva Cancelada',
          text: 'cambios aplicados correctamente'
        })
        location.reload()
      }).catch(error=>{
        this.loading=false
        console.log(error)
        let color="danger"
        let position="top-right"
        this.$vs.notification({
          color,
          position,
          title: 'Error',
          text: error
        })
      })
    },
    async deleteSuscription(){
      const result=await this.$apollo.mutate({
        //Mutation
        mutation: gql`mutation($id: Int!){
          deleteSuscription(id: $id){
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
          id: this.selected.id
        }
      })
      console.log(result)
    },
    asignarInfo(){
      this.getParkingsUsedBy().then(()=>{
        this.parqueaderos=this.res
        console.log(this.parqueaderos)
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
    }
  },
  mounted(){
    this.asignarInfo()
  }
}

</script>

<style lang="scss" scoped>
.main-admin-two{
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

</style>