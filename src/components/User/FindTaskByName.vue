<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <div class="alert alert-danger" role="alert" v-if="req">
        <small>Please enter brand or Model</small>
      </div>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="name">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="submit">Search</button>
      <router-link :to="{name:'UserProfilePage'}" class="btn btn-danger">Profile</router-link>
    </nav>
    <section>
      <div v-if="getAllTask">
        <CatalogTasks
          v-for="data in getAllTask"
          :data="data"
          :id="data.id"
        >
        </CatalogTasks>
      </div>
      <div class="alert alert-danger" role="alert" v-if="getError">
        <small>{{getError}}</small>
      </div>
    </section>
  </div>
</template>

<script>
import CatalogTasks from "../CatalogTasks";

export default {
  name: "FindTaskByName",
  data() {
    return {
      name: '',
      req:false
    }
  },
  components:{
    CatalogTasks
  },
  computed:{
    getAllTask() {
      return this.$store.getters.getAllTasks
    },
    getError(){
      return this.$store.getters.getFindError
    }
  },

  methods:{
    submit(){
      this.req = false
      this.$store.commit('findErrorCom','')
      if(this.name){
        this.$store.dispatch('findTaskByName',this.name)

      }else{
        this.req = true
      }

    }
  }
}
</script>

<style scoped>

</style>
