<template>
  <div class="main-home">
    <div class="container">
      <div class="caja1" style="float: left">
        <p style="font-weight:bold">Parqueaderos en Uso</p>
        <carousel-3d class="carousel" :width="300" :height="160" style="margin-top:10px">
        <slide :index="0" class="slider">
          Slide 1 Content
        </slide>
        <slide :index="1" class="slider">
          Slide 2 Content
        </slide>
        <slide :index="2" class="slider">
          Slide 3 Content
        </slide>
      </carousel-3d>
      </div>
      <div class="caja2" style="float: right" >
        <p style="font-weight:bold">Parqueaderos en Alquiler</p>
        <carousel-3d class="carousel" :width="300" :height="160" style="margin-top:10px">
        <slide :index="0" class="slider">
          Slide 1 Content
        </slide>
        <slide :index="1" class="slider">
          Slide 2 Content
        </slide>
        <slide :index="2" class="slider">
          Slide 3 Content
        </slide>
      </carousel-3d>
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
    user: 32,
    Regs: null
  }),
  methods: {
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
    this.registersQuery();
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
  border-style: solid;
  border-color:rgb(187, 194, 192)
}

</style>
