<template>
  <div class="container">
    <nav class="navbar  navbar-light bg-light d-flex justify-content-between">
      <div>
        <h1>{{getUserData.name}}</h1>
        <h1>{{getUserData.email}}</h1>
      </div>
      <div >
        <router-link :to="{name:'AdminAddCarModels'}" class="btn btn-danger">Add Car Models And Brands</router-link>
        <router-link :to="{name:'AdminAddCarTask'}" class="btn btn-danger">Add Car Task</router-link>
      </div>
      <div>
        <button class="btn btn-warning" @click="logout">Logout</button>
      </div>
    </nav>
    <div>
      <TaskComponent
        v-for="data in adminTasksGet"
        :data="data"
        :id="data.id"
      >

      </TaskComponent>
    </div>
  </div>
</template>

<script>
import TaskComponent from "./TaskComponent";
export default {
  name: "UserProfilePage",
  data() {
    return {
      key: 'value',
      token:''
    }
  },
  components:{
    TaskComponent
  },
  computed:{
    getUserData(){
      return this.$store.getters.getUserData
    },
    adminTasksGet(){
      return this.$store.getters.getAdminTasks
    }
  },
  mounted() {
    this.getToken()
    this.getUserDatas()
    this.getAdminTasks()
  },
  methods:{
    getToken(){
      this.token = localStorage.getItem('admin_token')
    },

    getAdminTasks(){
      this.$store.dispatch('getAdminTasks',this.token)
    },
    getUserDatas(){
      this.$store.dispatch('userDataAct',this.token)
    },
    logout(){
      this.$store.dispatch('adminLogout',this.token)
        .then(()=>{

        })
    }
  }
}
</script>

<style scoped>

</style>
