<template>
  <div class="card">
    <div class="card-body">
      <div>
        <input type="file" class="form-control" @change="(e) =>{
        addNewImage(e.target.files[0],data.id)
      }">
      </div>
      <div class="d-flex justify-content-around flex-wrap">
        <TaskPictureComponent
          v-for="images in data.task_images"
          :images="images"
          :key="images.id"
        >
        </TaskPictureComponent>
      </div>
      <h5 class="card-title">{{ data.brand }}</h5>
      <h5 class="card-title">{{ data.model }}</h5>
      <button class="btn btn-secondary" @click="() => this.clicked = !this.clicked">Change Brand or Model</button>
      <div v-if="clicked">
        <div >
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

        <button class="btn btn-primary" @click="saves(data.id)">Save</button>

      </div>
    </div>
  </div>
</template>

<script>
import TaskPictureComponent from "./TaskPictureComponent";

export default {
  name: "TaskComponent",
  data() {
    return {
      key: 'value',
      token: '',
      clicked: false,
      brand: '',
      model: ''
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
  },
  components: {
    TaskPictureComponent
  },
  props: {
    data: {
      type: Object, default: () => {
      }
    }
  },
  methods: {
    getToken() {
      this.token = localStorage.getItem('admin_token')
    },

    addNewImage(img, id) {
      let formData = new FormData();
      formData.append('file', img);
      let data = {
        formData,
        id,
        token: this.token
      }
      this.$store.dispatch('addTaskImage', data)
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

    saves(id) {
      let data = {
        token: this.token,
        brand: this.brand.brand,
        model: this.model.model,
        id
      }

      this.$store.dispatch('changeTaskBrandModel',data)
      .then(() =>{
        this.clicked = false
      })
    }
  },

}
</script>

<style scoped>

</style>
