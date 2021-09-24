<template>
  <div class="container">
    <div>
      <div class="card">
        <div class="card-body">
          <label for="">Add Car Brands</label>
          <input type="text" class="form-control" v-model="brand">
          <div class="alert alert-danger" role="alert" v-if="getError">
            <div v-for="er in getError">
              {{ er }}
            </div>
          </div>
          <button class="btn btn-warning" @click="saveBrand">Save</button>
          <div class="alert alert-primary" role="alert" v-if="getSuccessStatus">
            {{getSuccessStatus}}
          </div>
        </div>
      </div>
      <br>
      <div class="card">
        <div class="card-body" v-if="getAllBrands">
          <label for="">Add Car Models</label>
            <select class="form-select" aria-label="Default select example" v-model="selectedModel">
                <option selected="selected">Open this select menu</option>
                <option :value="brands" v-for="brands in getAllBrands">{{ brands.brand }}</option>
            </select>
          <div class="alert alert-primary" role="alert" v-if="getModelError">
            <div v-for="er in getModelError">
              {{ er }}
            </div>
          </div>
          <input type="text" class="form-control" v-model="model">
          <button class="btn btn-warning" @click="saveModel">Save</button>
          <div class="alert alert-primary" role="alert" v-if="getModelSuccess">
            {{getModelSuccess}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAddCarModels",
  data() {
    return {
      brand: '',
      model: '',
      selectedModel: '',
      token: ''
    }
  },
  mounted() {
    this.getToken()
      this.getBrandDatas()

  },
  computed: {
    getAllBrands(){
      return this.$store.getters.getBrands
    },
    getError() {
      return this.$store.getters.getErrorStatus
    },
    getSuccessStatus() {
      return this.$store.getters.getSuccessStatus
    },
    getModelSuccess() {
      return this.$store.getters.getModelSuccess
    },
    getModelError() {
      return this.$store.getters.getModelError
    },

  },

  methods: {
    getToken() {
      this.token = localStorage.getItem('admin_token')
    },
    getBrandDatas() {
      this.$store.dispatch('getBrandDatas')
    },
    saveBrand() {
      let data = {
        token: this.token,
        brand: this.brand
      }
      this.$store.dispatch('addCarBrand', data)
    },
    saveModel() {
      let data = {
        token: this.token,
        brand_id: this.selectedModel.id,
        model: this.model
      }
      this.$store.dispatch('addCarModel', data)
      //console.log(data)

    }
  }
}
</script>

<style scoped>

</style>
