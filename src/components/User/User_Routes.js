import UserLoginPage from "./UserLoginPage";
import UserSignupPage from "./UserSignupPage";
import UserProfilePage from "./UserProfilePage";
import FindTaskByName from "./FindTaskByName";
export default [
  {
    path: '/login',
    name: 'UserLoginPage',
    component: UserLoginPage,
    beforeEnter:(to,from,next) =>{
      if(localStorage.getItem('token')){
        return next({
          name: 'UserProfilePage'
        })
      }
      next()
    }

  },

  {
    path: '/signup',
    name: 'UserSignupPage',
    component: UserSignupPage,
    beforeEnter:(to,from,next) =>{
      if(localStorage.getItem('token')){
        return next({
          name: 'UserProfilePage'
        })
      }
      next()
    }


  },

  {
    path: '/user/profile',
    name: 'UserProfilePage',
    component: UserProfilePage,
    beforeEnter:(to,from,next) =>{
      if(!localStorage.getItem('token')){
        return next({
          name: 'UserLoginPage'
        })
      }
      next()
    }

  },

  {
    path: '/user/profile/find_task',
    name: 'FindTaskByName',
    component: FindTaskByName,
    beforeEnter:(to,from,next) =>{
      if(!localStorage.getItem('token')){
        return next({
          name: 'UserLoginPage'
        })
      }
      next()
    }

  },


]
