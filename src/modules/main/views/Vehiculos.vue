<template>
  <div class="main-vehiculos">
    <div class="container">
        <div class="buttons-container">
          <vs-button class="button-style" size="large" @click="dialogCrear=!dialogCrear"><i class='bx bx-plus'> </i> Agregar</vs-button>
          <vs-button class="button-style" size="large" @click="showEditmodal"><i class='bx bx-pencil'> </i> Editar</vs-button>
          <vs-button class="button-style" size="large" @click="dialogEliminar=!dialogEliminar"><i class='bx bxs-trash'> </i> Borrar</vs-button>
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
                  Tamano
                </vs-th>
                <vs-th>
                  Descripción
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in vehicle"
                :data="tr"
                :is-selected="selected == tr">
                <vs-td>
                  {{ tr.id }}
                </vs-td>
                <vs-td>
                  {{ tr.tipo }}
                </vs-td>
                <vs-td>
                  {{ tr.tamano }}
                </vs-td>
                <vs-td>
                  {{ tr.descripcion }}
                </vs-td>
              </vs-tr>
            </template>
            <template #notFound>
              No tienes ningún vehículo registrado.
            </template>
          </vs-table>
        </div>
    </div>

  <!--Dialog Crear Vehiculo-->
    <div class="center">
        <vs-dialog v-model="dialogCrear">
          <template #header>
            <h2 class="not-margin" style="color: #00507D;">
              Crear un vehiculo
            </h2>
          </template>
          <div class="con-form">
            <span class="p-float-label">
              <vs-input label-placeholder="Tipo" primary block v-model="tipo" ></vs-input>
            </span>
            <br />
            <span class="p-float-label">
                <vs-input label-placeholder="Tamaño" primary block v-model="tamano" ></vs-input>
            </span>
            <br />
            <span class="p-float-label">
                <vs-input label-placeholder="Descripción" primary block v-model="descripcion" ></vs-input>
            </span>
            <br />
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button @click="verificarInfo" :loading=loading>
                Guardar
              </vs-button>
              <vs-button @click="dialogCrear=false" dark transparent>
                Cancelar
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>
      
  <!--Dialog Editar Vehiculo-->
      <div class="center">
        <vs-dialog v-model="dialogEditar">
          <template #header>
            <h2 class="not-margin" style="color: #00507D;">
              Editar vehiculo
            </h2>
          </template>

          <div class="con-form">
            <span class="p-float-label">
              <vs-input label-placeholder="Tipo" primary block v-model="vehicles.tipo" ></vs-input>
            </span>
            <br />
            <span class="p-float-label">
                <vs-input label-placeholder="Tamaño" primary block  v-model="vehicles.tamano" ></vs-input>
            </span>
            <br />
            <span class="p-float-label">
                <vs-input label-placeholder="Descripción" primary block v-model="vehicles.descripcion" ></vs-input>
            </span>
            <br />
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button @click="editarVehiculo" :loading=loading>
                Guardar
              </vs-button>
              <vs-button @click="dialogEditar=false" dark transparent>
                Cancelar
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>

  <!--Dialog Borrar Vehiculo-->
      <div class="center">
        <vs-dialog v-model="dialogEliminar">
          <template #header>
            <h2 class="not-margin" style="color: #00507D;">
              Borrar vehiculo
            </h2>
          </template>

          <div class="confirmation-content">
            <span>¿Estas seguro de eliminar tu vehiculo con el Id {{this.selected.id}}? </span>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button danger :loading=loading @click="deleteVehicle">
                Borrar
              </vs-button>
              <vs-button @click="dialogEliminar=false" dark transparent>
                Cancelar
              </vs-button>
            </div>
          </template>
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
      user_id: null,
      vehicle: null,
      vehicles: {
        id: null,
        tipo: null,
        tamano: null,
        descripcion: null
      },
      selected: {},
      dialogCrear: false,
      dialogEditar: false,
      dialogEliminar: false,
      exito:null,
      info: null,
      value: '',
      persist:[],
      loading:false,
      tipo: null,
      tamano: null,
      descripcion: null,
      tipos: [
        'Carro', 'Moto', 'Camioneta', 'Camión', 'Otro Vehiculo'
      ],
      tamanos: [
        'Grande', 'Mediano', 'Pequeno'
      ]
    }
  },

  methods:{
    verificarInfo(){
      if(this.tipo==null || this.tamano==null ||this.descripcion==null 
          || this.tipo=="" || this.tamano=="" ||this.descripcion==""){
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
          this.agregarVehiculo()
      }
    },
    agregarVehiculo(){
            this.loading=true
            this.createVehicle().then(()=>{
            this.loading=false
            let color="success"
            let position="top-right"
            this.$vs.notification({
                color,
                position,
                title: 'Registro Exitoso',
                text: 'Agregaste un vehiculo'
            })
            this.dialogCrear = false;
            location.reload();

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
    deleteVehicle(){
      this.loading=true
      this.deleteMutation().then(()=>{
      let color="success"
      let position="top-right"
      this.$vs.notification({
        color,
        position,
        title: 'Vehiculo Borrado',
        text: 'Cambios aplicados correctamente'
      })
      this.dialogEliminar = false;
      location.reload();
      }).catch(error =>{
        this.loading=false
        console.log(error)
      })
    },
    async deleteMutation(){
      //let user_id=parseInt(localStorage.getItem("id"))
        const result =await this.$apollo.mutate({
        // Mutation
        mutation: gql`mutation ($id_vehicle: Int!) {
          deleteVehicle(id:$id_vehicle)
        }`,
        // Parameters
        variables: {
          id_vehicle: this.selected.id,
          },
        })
        console.log(result.data.deleteVehicle)
      },
    showEditmodal(){
      this.dialogEditar = true;
      this.vehicles = this.selected;
    },
    async getVehicles() {
      //let user_id=parseInt(localStorage.getItem("id"))
      const result = await this.$apollo.query({
        // Query
        query: gql`
          query($id: Int!) {
              getVehicle(id_client: $id) {
                id
                tipo
                tamano
                descripcion
              }
            }
          `,
          // Parameters
            variables: {
              id: this.user_id,
            },
          });
          this.vehicle=result.data.getVehicle;
      },
      async createVehicle() {
        //let user_id=parseInt(localStorage.getItem("id"))
        const result = await this.$apollo.mutate({
          // Mutation
          mutation: gql`
            mutation ($id:Int!,$tipo:String!,$tamano:String!,$descripcion:String!){
              createVehicle(vehicle:{id_client:$id, tipo:$tipo, tamano:$tamano, descripcion:$descripcion}){
                id_client     
                tipo 
                tamano 
                descripcion
              }
            }`,
            // Parameters
              variables: {
                id: this.user_id,
                tipo: this.tipo,
                tamano: this.tamano,
                descripcion: this.descripcion
              },
          });
            this.info=result.data.createVehicle;
        },
        editarVehiculo(){
          if(this.vehicles.tipo=="" || this.vehicles.tamano=="" || this.vehicles.descripcion==""){
            let color="warn"
            let position="top-right"
            this.$vs.notification({
              color,
              position,
              title: 'Advertencia',
              text: 'Por favor llene todos los campos correspondientes'
            })
            this.exito=false
          }else{
            this.editar();
          }
        },
        editar(){
          this.loading=true
          this.editarMutation().then(()=>{
          this.loading=false
          let color="success"
          let position="top-right"
          this.$vs.notification({
            color,
            position,
            title: 'Información Editada',
            text: 'cambios aplicados correctamente'
          })
            this.exito = true
            this.dialogEditar=!this.dialogEditar
            
          }).catch(error =>{
            this.exito=false
            this.loading=false
            console.log(error)
            let color="danger"
            let position="top-right"
            this.$vs.notification({
              color,
              position,
              title: 'Error',
              text: 'Datos ingresados incorrectos'
            })
          })
        },
        async editarMutation(){
          //let user_id=parseInt(localStorage.getItem("id"))
          const result =await this.$apollo.mutate({
          // Mutation
          mutation: gql`mutation ($id_vehicle:Int!,$tipo:String!,$tamano:String!,$descripcion:String!){
            updateVehicle(id:$id_vehicle, vehicle:{tipo:$tipo, tamano:$tamano, descripcion:$descripcion}) {
              tipo
              tamano
              descripcion
            }
          }`,
          // Parameters
          variables: {
            id_vehicle: this.vehicles.id,
            tipo: this.vehicles.tipo,
            tamano:this.vehicles.tamano,
            descripcion: this.vehicles.descripcion,
            },
          })
          this.info=result.data.updateUser
        },
        /*async getAllVehicles() {
          const result = await this.$apollo.query({
            // Query
            query: gql`
              query{
                  getAllVehicles{
                    id
                    tipo
                    tamano
                    descripcion
                  }
                }
              `,
              // Parameters
                variables: {
                },
            });
              this.vehicles=result.data.getAllVehicles;
          },*/
  },
  mounted(){
    this.user_id=parseInt(localStorage.getItem("id"))
    console.log(this.user_id)
    this.getVehicles();
    //this.getAllVehicles();
  } 
}

</script>

<style lang="scss" scoped>
.main-vehiculos{
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
  border-radius: 10px;
  top: 70px;
  background-color:rgb(230, 237, 238);
  box-shadow: 0px 2px 10px rgb(197, 197, 197);
}

.buttons-container{
    display: flex;
    width: 100%;
}

.footer-dialog{
  display: flex;
  justify-content: flex-end;
}
</style>