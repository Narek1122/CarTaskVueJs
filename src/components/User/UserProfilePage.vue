<template>
  <div class="container">
    <nav class="navbar  navbar-light bg-light d-flex justify-content-between">
        <div>
          <h1>{{getUserData.name}}</h1>
          <h1>{{getUserData.email}}</h1>
        </div>
      <div>
        <router-link :to="{name:'FindTaskByName'}" class="btn btn-danger">Find Task By Name</router-link>
      </div>
        <div>
          <button class="btn btn-warning" @click="logout">Logout</button>
        </div>
    </nav>
    <section>
      <div v-if="getAllTask">
        <CatalogTasks
          v-for="data in getAllTask"
          :data="data"
          :key="data.id"
        >
        </CatalogTasks>
      </div>
    </section>
  </div>
</template>

<script>
import CatalogTasks from "../CatalogTasks";
export default {
  name: "UserProfilePage",
  data() {
    return {
      key: 'value',
      token:''
    }
  },
  components:{
    CatalogTasks
  },
  computed:{
    getUserData(){
      return this.$store.getters.getUserData
    },
    getAllTask() {
      return this.$store.getters.getAllTasks
    }
  },
  mounted() {
    this.getToken()
    this.getUserDatas()
    this.getAllTasks()
  },
  methods:{
    getToken(){
     this.token = localStorage.getItem('token')
    },
    getUserDatas(){
      this.$store.dispatch('userDataAct',this.token)
    },
    logout(){
      this.$store.dispatch('userLogout',this.token)

    },
    getAllTasks(){
      this.$store.dispatch('getAllTasks')
    }
  }
}
</script>

<style scoped>

</style>
