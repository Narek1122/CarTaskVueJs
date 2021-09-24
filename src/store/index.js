import Vue from 'vue'
import Vuex from "vuex";
import axios from "axios";
import router from '../router'
import VueAxios from "vue-axios";
import {stat} from "copy-webpack-plugin/dist/utils/promisify";
Vue.use(Vuex);

let authAxios;

function Auth(token) {
  authAxios = axios.create({
    baseURL: `${process.env.SERVER_URL}`,
    headers: {
      Authorization: `Bearer ` + token,
    }
  })
}

function AuthImage(token) {
  authAxios = axios.create({
    baseURL: `${process.env.SERVER_URL}`,
    headers: {
      Authorization: `Bearer ` + token,
      'content-type': 'multipart/form-data'
    }
  })
}

export default new Vuex.Store({
  state: {
    user: '',
    brands: '',
    errors: '',
    success: '',
    modelError: '',
    modelSuccess: '',
    brandsAndModels:'',
    adminTasks:'',
    allTasks:'',
    findError:''
  },
  getters: {
    getUserData(state) {
      return state.user
    },
    getBrands(state) {
      return state.brands
    },
    getErrorStatus(state) {
      return state.errors
    },
    getSuccessStatus(state) {
      return state.success
    },
    getModelSuccess(state) {
      return state.modelSuccess
    },
    getModelError(state) {
      return state.modelError
    },
    getBrandsAndModels(state){
      return state.brandsAndModels
    },
    getAdminTasks(state){
      return state.adminTasks
    },
    getAllTasks(state){
      return state.allTasks
    },
    getFindError(state){
      return state.findError
    }
  },
  actions: {
    userDataAct(ctx, token) {
      Auth(token)
      authAxios.get('auth/user-profile')
        .then((res) => {
          ctx.commit('userDataMut', res.data)
        })
    },
    userLogout(ctx, token) {
      Auth(token)
      authAxios.post('auth/logout')
        .then((res) => {
          localStorage.removeItem('token')
          router.push({name: "HomePage"})

        })
    },
    adminLogout(ctx, token) {
      Auth(token)
      authAxios.post('auth/logout')
        .then((res) => {
          localStorage.removeItem('admin_token')
          router.push({name: "HomePage"})
        })

    },
    addCarBrand(ctx, data) {
      Auth(data.token)
      authAxios.post('auth/add_car_brand', {brand: data.brand})
        .then((res) => {
          if (res.status == 201) {
            ctx.commit('success', res.data.message)

          }
        })
        .catch((er) => {
          if (er.response) {
            console.log(er.response.data)
            ctx.commit('errors', er.response.data)
          }
        })
    },
    getBrandDatas(ctx) {
      axios.get(process.env.SERVER_URL + 'get_car_brands')
        .then((res) => {
          ctx.commit('getBrandData', res.data.brands)
        })
    },
    addCarModel(ctx, data) {
      Auth(data.token)
      authAxios.post('auth/add_car_model', data)
        .then((res) => {
          if (res.status == 201) {
            ctx.commit('modelSuccess', res.data.message)
            router.push({name: "AdminProfilePage"})
          }
        })
        .catch((er) => {
          if (er.response) {
            ctx.commit('modelErrors', er.response.data)
          }
        })
    },

    brandsAndModelsAct(ctx){
      axios.get(process.env.SERVER_URL + 'get_car_brands_and_models')
        .then((res) => {
          ctx.commit('brandsAndModels',res.data.data)
        })
    },
    addCarTask(ctx,data){
      Auth(data.token)
      let id;
      authAxios.post('auth/add_task',data)
        .then((res) => {
          if (res.status == 201) {
            if(data.picture){
              id = res.data.brand.id
            }else{
              router.push({name: "AdminProfilePage"})
            }
          }
        })
        .catch((er) => {
          if (er.response) {
            ctx.commit('modelErrors', er.response.data)
          }
        })
        .then(() =>{
          if(data.picture){
            AuthImage(data.token)
            let formData = new FormData();
            formData.append('file', data.picture);

            authAxios.post('auth/add_task_image/' + id  , formData)
              .then((res) => {
                router.push({name: "AdminProfilePage"})
              })
          }

        })

    },
    getAdminTasks(ctx,token){
      Auth(token)
      authAxios.get('auth/admin_get_tasks')
        .then((res) => {
          ctx.commit('getAdminTasks',res.data.tasks)
        })
    },
    deletesTaskImage(ctx,data){
      Auth(data.token)
      authAxios.delete('auth/delete_task_image/' + data.image.picture)
        .then((res) => {

          ctx.commit('deletesAdminTaskImage',data.image)

        })
    },
    addTaskImage(ctx,data){
      AuthImage(data.token)
      authAxios.post('auth/add_task_image/' + data.id  , data.formData)
        .then((res) => {
          let dat = {
            id:data.id,
            img:res.data.data
          }

          ctx.commit('addAdmintaskImage',dat)
        })
    },

    changeTaskBrandModel(ctx,data){
      Auth(data.token)
      authAxios.post('auth/change_task_brand_model/' + data.id  , data)
        .then((res) => {

          ctx.commit('changeTaskBrandModel',data)
        })
    },
    getAllTasks(ctx){
      axios.get(process.env.SERVER_URL + 'get_tasks')
        .then((res) =>{
          ctx.commit('allTasksCom',res.data.tasks)
        })
    },
    findTaskByName(ctx,ids){
      axios.get(process.env.SERVER_URL + `get_tasks_by/` + ids )
        .then((res) =>{
          if(res.data.status != 200){
            ctx.commit('findErrorCom','Not Found')

          }else{
            ctx.commit('allTasksCom',res.data.tasks)

          }

        })
    }
  },
  mutations: {
    userDataMut(state, data) {
      state.user = data
    },
    errors(state, data) {
      state.brandStatus = data
    },
    success(state, data) {
      state.success = data
    },
    getBrandData(state, data) {
      state.brands = data
    },
    modelErrors(state, data) {
      state.modelError = data
    },
    modelSuccess(state, data) {
      state.modelSuccess = data
    },
    brandsAndModels(state, data) {
      state.brandsAndModels = data
    },
    getAdminTasks(state, data) {
      state.adminTasks = data
    },
    deletesAdminTaskImage(state, data) {
      let dat = state.adminTasks
      for (let i = 0; i < dat.length; i++) {
        let dat2 = dat[i].task_images
        for (let j = 0; j < dat2.length; j++) {
          if (dat2[j].picture == data.picture) {
            dat2.splice([j], 1)
          }
        }
      }
    },
    addAdmintaskImage(state, data){
      let dat = state.adminTasks
      for(let i=0;i<dat.length;i++){
        if(dat[i].id == data.id){
          dat[i].task_images.push(data.img)
        }
      }
    },
    changeTaskBrandModel(state, data){
      let dat = state.adminTasks
      for(let i=0;i<dat.length;i++){
        if(dat[i].id == data.id){
          dat[i].brand = data.brand
          dat[i].model = data.model
        }
      }
    },
    allTasksCom(state, data) {
      state.allTasks = data
    },
    findErrorCom(state, data) {
      state.findError = data
    },

  }
})
