<template>
  <div class="main-perfil">
    <div class="container">
      <div class="perfil-container">
        <div style="height:20px"></div>
        <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png" alt="foto_perfil" class="avatar">
        <div class="info-container">
          <p style="font-size:16px"><span style="font-weight:bold">Nombre: </span>{{name}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Apellido: </span> {{last_name}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Correo: </span> {{email}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Teléfono: </span> {{phone}}</p>
          <p style="font-size:16px"><span style="font-weight:bold">Dirección: </span> {{address}}</p>
          <vs-button style="margin:auto;width:200px;margin-top:10px" @click="edit_dialog=!edit_dialog">Editar Información</vs-button>
          <vs-button dark style="margin:auto;width:200px;margin-top:10px" @click="password_dialog=!password_dialog">Cambiar Contraseña</vs-button>
          <vs-button dark style="margin:auto;width:200px;margin-top:10px" @click="payment_dialog_function">Cambiar Metodo de Pago</vs-button>
          <vs-button danger style="margin:auto;width:200px;margin-top:10px" @click="delete_dialog=!delete_dialog">Eliminar Cuenta</vs-button>
          <vs-dialog v-model="edit_dialog">
            <template #header>
              <h4 class="not-margin">
                Editar Información personal
              </h4>
            </template>
            <div class="con-form">
              <vs-input block v-model="name" placeholder="Name" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bx-rename' ></i>
                </template>
              </vs-input>
              <vs-input block v-model="last_name" placeholder="Name" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bxs-rename' ></i>
                </template>
              </vs-input>
              <vs-input block v-model="email" placeholder="Email" style="margin-bottom:10px">
                <template #icon>
                  @
                </template>
              </vs-input>
              <vs-input block v-model="phone" placeholder="Phone" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bxs-phone'></i>
                </template>
              </vs-input>
              <vs-input block v-model="address" placeholder="Adress" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bxs-building-house' ></i>
                </template>
              </vs-input>
            </div>
            <template #footer>
              <div class="footer-dialog">
                <vs-button block @click="editarInfo" :loading=loading>
                  Cambiar
                </vs-button>       
              </div>
            </template>
          </vs-dialog>
          <vs-dialog v-model="password_dialog">
            <template #header>
              <h4 class="not-margin">
                Ingresa la contraseña nueva
              </h4>
            </template>
            <div class="con-form">
              <vs-input block v-model="new_password1" placeholder="Nueva Contraseña" type="password" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bx-rename' ></i>
                </template>
              </vs-input>
              <vs-input block v-model="new_password2" placeholder="Repite la nueva contraseña" type="password" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bx-rename' ></i>
                </template>
              </vs-input>
            </div>
            <template #footer>
              <div class="footer-dialog">
                <vs-button block @click="editarPassword" :loading=loading>
                  Cambiar Contraseña
                </vs-button>       
              </div>
            </template>
          </vs-dialog>
          <vs-dialog v-model="payment_dialog">
            <template #header>
              <h4 class="not-margin">
                Ingrese el metodo de pago
              </h4>
            </template>
            <div class="con-form">
              <vs-input block v-model="new_payment_method" type="number" style="margin-bottom:10px">
                <template #icon>
                  <i class='bx bxs-credit-card-front'></i>
                </template>
              </vs-input>
            </div>
            <template #footer>
              <div class="footer-dialog">
                <vs-button block @click="cambiarMetodoPago" :loading=loading>
                  Cambiar Metodo de Pago
                </vs-button>       
              </div>
            </template>
          </vs-dialog>
          <vs-dialog v-model="delete_dialog">
            <template #header>
            <p> ¿Estas seguro que deseas Borrar la cuenta?</p>
            </template>
              <div class="logout-button-container">
                <vs-button @click="deleteAcount" :loading=loading>Si, Borrar Cuenta</vs-button>
                <vs-button @click="delete_dialog=!delete_dialog">No, Continuar</vs-button>
              </div>
          </vs-dialog>
        </div>
      </div>
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
      persist:[],
      name:null,
      last_name:null,
      email:null,
      password:null,
      phone:null,
      payment_method:null,
      address:null,
      edit_dialog:false,
      password_dialog:false,
      payment_dialog:false,
      delete_dialog:false,
      info:null,
      loading:false,
      new_password1:"",
      new_password2:"",
      new_payment_method:"",
      exito:null
  }
},
methods:{
deleteAcount(){
this.loading=true
this.deleteMutation().then(()=>{
  let color="success"
    let position="top-right"
    this.$vs.notification({
      color,
      position,
      title: 'Cuenta Borrada',
      text: 'cambios aplicados correctamente'
    })
  localStorage.clear()
  this.$router.push({name:"home"})
})
},
async deleteMutation(){
let user_id=parseInt(localStorage.getItem("id"))
  const result =await this.$apollo.mutate({
  // Mutation
  mutation: gql`mutation ($id: Int!) {
    deleteUser(id:$id) {
      name
      email
      password
    }
  }`,
  // Parameters
  variables: {
    id: user_id,
    },
  })
  console.log(result.data.deleteUser)
},
payment_dialog_function(){
  this.new_payment_method=this.payment_method
  this.payment_dialog=!this.payment_dialog
},
cambiarMetodoPago(){
  if(this.new_payment_method=="" || this.new_payment_method==null){
    let color="warn"
    let position="top-right"
    this.$vs.notification({
      color,
      position,
      title: 'Advertencia',
      text: 'Por favor llene todos los campos correspondientes'
    })
  }else{
    this.changePayment()
  }
},
changePayment(){
  this.loading=true
  this.paymentMutation().then(()=>{
    this.loading=false
    let color="success"
    let position="top-right"
    this.$vs.notification({
      color,
      position,
      title: 'Metodo de Pago Editada',
      text: 'cambios aplicados correctamente'
    })
    this.payment_method=this.info.payment_method
    this.payment_dialog=!this.payment_dialog
  }).catch(error=>{
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
async paymentMutation(){
  let user_id=parseInt(localStorage.getItem("id"))
  const result =await this.$apollo.mutate({
  // Mutation
  mutation: gql`mutation ($id: Int!, $payment_method: String!) {
    addPaymentMethod(id:$id,payment:{payment_method:$payment_method}) {
      payment_method
    }
  }`,
  // Parameters
  variables: {
    id: user_id,
    payment_method:this.new_payment_method
    },
  })
  this.info=result.data.addPaymentMethod
},

async getUser(){
  let user_id=parseInt(localStorage.getItem("id"))
  const result=await this.$apollo.query({
        // Query
        query: gql`
          query($id: Int!) {
            getUser(id: $id) {
              name
              last_name
              email
              password
              phone
              payment_method
              address
            }
          }
        `,
        // Parameters
        variables: {
          id: user_id
        },
      });
      console.log(result.data.getUser)
      this.info=result.data.getUser
},
asignarInfo(){
  this.getUser().then(()=>{
    this.name=this.info.name
    this.persist.push(this.name)
    this.last_name=this.info.last_name
    this.persist.push(this.last_name)
    this.email=this.info.email
    this.persist.push(this.email)
    this.password=this.info.password
    this.persist.push(this.password)
    this.phone=this.info.phone
    this.persist.push(this.phone)
    this.payment_method=this.info.payment_method
    this.persist.push(this.payment_method)
    this.address=this.info.address
    this.persist.push(this.address)
  })
},
editarInfo(){
  if(this.name=="" || this.last_name=="" || this.email=="" || this.phone=="" || this.address==""){
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
    this.exito=true
    this.name=this.info.name
    this.persist[0]=this.name
    this.last_name=this.info.last_name
    this.persist[1]=this.last_name
    this.email=this.info.email
    this.persist[2]=this.email
    this.password=this.info.password
    this.persist[3]=this.password
    this.phone=this.info.phone
    this.persist[4]=this.phone
    this.payment_method=this.info.payment_method
    this.persist[5]=this.payment_method
    this.address=this.info.address
    this.persist[6]=this.address
    this.edit_dialog=!this.edit_dialog
    
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
      text: 'datos ingresados incorrectos'
    })
  })
},
async editarMutation(){
  let user_id=parseInt(localStorage.getItem("id"))
  const result =await this.$apollo.mutate({
  // Mutation
  mutation: gql`mutation ($id: Int!, $name: String!,$last_name: String!,$email: String!,$phone: Int!,$address: String!) {
    updateUser(id:$id,user:{name:$name,last_name:$last_name,email:$email,phone:$phone,address:$address}) {
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
    id: user_id,
    name: this.name,
    last_name:this.last_name,
    email: this.email,
    phone:parseInt(this.phone),
    address:this.address
    },
  })
  this.info=result.data.updateUser
},
editarPassword(){
  if(this.new_password1 =="" || this.new_password1==null || this.new_password2=="" ||this.new_password2==null){
    let color="warn"
    let position="top-right"
    this.$vs.notification({
      color,
      position,
      title: 'Advertencia',
      text: 'Por favor llene todos los campos correspondientes'
    })
  }else{
    if(this.new_password1!=this.new_password2){
      let color="warn"
      let position="top-right"
      this.$vs.notification({
      color,
      position,
      title: 'Advertencia',
      text: 'Las contraseñas no coinciden'
    })
    }else{
      this.passwordUpdate()
    }
  }
},
passwordUpdate(){
  this.loading=true
  this.passwordMutation().then(()=>{
    this.loading=false
    let color="success"
    let position="top-right"
    this.$vs.notification({
      color,
      position,
      title: 'Contraseña Editada',
      text: 'cambios aplicados correctamente'
    })
    this.password=this.info.password
    this.new_password1=""
    this.new_password2=""
    this.password_dialog=!this.password_dialog
  }).catch(error=>{
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
async passwordMutation(){
  let user_id=parseInt(localStorage.getItem("id"))
  const result =await this.$apollo.mutate({
  // Mutation
  mutation: gql`mutation ($id: Int!, $password: String!) {
    changePassword(id:$id,password:{password:$password}) {
      password
    }
  }`,
  // Parameters
  variables: {
    id: user_id,
    password:this.new_password1
    },
  })
  this.info=result.data.changePassword
},
change_dialog(){
    if(this.edit_dialog==false){
      if(this.exito!=true){
        console.log(this.persist)
        this.name=this.persist[0]
        this.last_name=this.persist[1]
        this.email=this.persist[2]
        this.phone=this.persist[4]
        this.address=this.persist[6]
        this.exito=null
      }else{
        this.exito=null
      }
    }
  }
},
watch:{
  edit_dialog:"change_dialog"
},
mounted(){
 this.asignarInfo()
}
}

</script>

<style lang="scss" scoped>
.main-perfil{
  min-height: 100vh;
  background: rgb(206,225,229);
  background: linear-gradient(180deg, rgba(206,225,229,1) 0%, rgba(223,221,255,1) 10%, rgba(0,255,87,0.3799894957983193) 100%);
  padding-left: 70px;
}

.container{
  padding-top: 60px;
  margin:auto;
  width: 40%;
}

.perfil-container{
  width: 100%;
  background-color: #ffff;
  box-shadow: 0px 2px 10px rgb(195, 196, 195);
  border-radius: 10px;
  padding:2px;
}

.avatar{
  width: 150px;
  border-radius:75px;
  display: block;
  margin:auto;
  cursor: pointer;
  background-color: #CEE1E5;
}

.info-container{
  width: 350px;
  margin: 20px auto;
  p{
    line-height: 30px;
  }
}

.logout-button-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row
}
</style>