<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div>
          <router-link :to="{name:'UserLoginPage'}" class="btn btn-primary">Login</router-link>
          <router-link :to="{name:'UserSignupPage'}" class="btn btn-danger">SignUp</router-link>
        </div>
        <div>
          <a class="navbar-brand text-danger" href="/">Cars</a>
        </div>
        <div class="d-flex justify-content-end">
          <router-link :to="{name:'AdminLoginPage'}" class="btn btn-primary">Admin Login</router-link>
        </div>
      </nav>
    </header>
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
  name: "HomePage",
  data() {
    return {
      key: 'value'
    }
  },
  components:{
    CatalogTasks
  },
  computed:{
    getAllTask() {
      return this.$store.getters.getAllTasks
    }
  },
  mounted() {
    this.getAllTasks()
  },
  methods:{
    getAllTasks(){
      this.$store.dispatch('getAllTasks')
    }
  }
}
</script>

<style scoped>

</style>
