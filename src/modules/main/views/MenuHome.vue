<template>
  <div class="main-home">
    <div class="container">
      <div class="caja1" style="float: left"></div>
      <div class="caja2" style="float: right">  
      </div>
    </div>
    <div class="container2">
      <vs-table v-if="Regs!=null">
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
export default {
  data: () => ({
    page: 1,
    max: 5,
    card: 6,
    user: 32,
    Regs: null,
  }),
  methods: {
   async registersQuery(){
            const result =await this.$apollo.query({
            // Query
            query: gql`query ($user: Int!) {
                getRegisterUser(user:$user) {
                ParkingId
    		Type
    		Date
                }
            }`,
            // Parameters
            variables: {
                user: this.user,
            
            },
            })
            console.log(result.data.getRegisterUser)
            this.Regs=result.data.getRegisterUser
        }

  },
  mounted(){
    this.registersQuery()
  },
       
};
</script>

<style lang="scss" scoped>
.main-home {
  min-height: 100vh;
  background: #cee1e5;
  padding-left: 70px;
}
.container {
  padding-top: 100px;
  width: 80%;
  margin: auto;
}

.caja1 {
  width: 40%;
  height: 200px;
  background-color: cornflowerblue;
}
.caja2 {
  width: 50%;
  height: 220px;
  background-color: rgb(197, 19, 241);
}

.container2 {
  width: 80%;
  margin: 250px auto;
  height: 270px;
  background-color: cornflowerblue;
}


</style>

