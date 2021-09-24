<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Add Car Task
      </div>
      <div class="card-body">
        <div>
          <div v-if="getErrorStatus">
            <div class="alert alert-danger" role="alert" v-for="er in getErrorStatus">
              {{er}}
            </div>
          </div>
          <div v-if="getAllBrandsAndModel">
            <select class="form-select" aria-label="Default select example" v-model="brand">
              <option selected="selected">Open this select menu</option>
              <option :value="brands" v-for="brands in getAllBrandsAndModel">{{ brands.brand }}</option>
            </select>
          </div>
        </div>
        <div>
          <div v-if="brand">
            <select class="form-select" aria-label="Default select example" v-model="model">
              <option selected="selected">Open this select menu</option>
              <option :value="models" v-for="models in getModel()">{{ models.model }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="">Image</label>
          <input type="file" class="form-control" @change="(e) =>{
        picture = e.target.files[0]
      }">
        </div>
        <div>
          <button @click="save" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAddCarTask",
  data() {
    return {
      brand: '',
      model: '',
      token:'',
      picture:''
    }
  },
  mounted() {
    this.getToken()
    this.getAllBrandsAndModels()
  },
  computed: {
    getAllBrandsAndModel() {
      return this.$store.getters.getBrandsAndModels
    },
    getErrorStatus() {
      return this.$store.getters.getModelError
    }
  },
  methods: {
    getToken(){
      this.token = localStorage.getItem('admin_token')
    },
    getAllBrandsAndModels() {
      this.$store.dispatch('brandsAndModelsAct')
    },

    getModel() {
      for (let i = 0; i < this.getAllBrandsAndModel.length; i++) {
        if (this.getAllBrandsAndModel[i].id === this.brand.id) {
          return this.getAllBrandsAndModel[i].models
        }
      }
    },

    savePicture(){

    },

    save() {
      let data = {
        token: this.token,
        brand: this.brand.brand,
        model: this.model.model,
        picture: this.picture
      }

      this.$store.dispatch('addCarTask', data)

    }

  },

}
</script>

<style scoped>

</style>
