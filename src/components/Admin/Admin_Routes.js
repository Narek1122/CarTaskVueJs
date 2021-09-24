import AdminLoginPage from "./AdminLoginPage";
import AdminProfilePage from "./AdminProfilePage";
import AdminAddCarModels from "./AdminAddCarModels";
import AdminAddCarTask from "./AdminAddCarTask";


export default [
  {
    path: '/admin/login',
    name: 'AdminLoginPage',
    component: AdminLoginPage,
    beforeEnter:(to,from,next) =>{
      if(localStorage.getItem('admin_token')){
        return next({
          name: 'AdminProfilePage'
        })
      }
      next()
    }

  },

  {
    path: '/admin/profile',
    name: 'AdminProfilePage',
    component: AdminProfilePage,
    beforeEnter:(to,from,next) =>{
      if(!localStorage.getItem('admin_token')){
        return next({
          name: 'AdminLoginPage'
        })
      }
      next()
    }

  },

  {
    path: '/admin/profile/add_car_models',
    name: 'AdminAddCarModels',
    component: AdminAddCarModels,
    beforeEnter:(to,from,next) =>{
      if(!localStorage.getItem('admin_token')){
        return next({
          name: 'AdminLoginPage'
        })
      }
      next()
    }

  },

  {
    path: '/admin/profile/add_car_task',
    name: 'AdminAddCarTask',
    component: AdminAddCarTask,
    beforeEnter:(to,from,next) =>{
      if(!localStorage.getItem('admin_token')){
        return next({
          name: 'AdminLoginPage'
        })
      }
      next()
    }

  },


]
