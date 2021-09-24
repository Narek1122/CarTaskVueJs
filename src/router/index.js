import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "../components/Home/HomePage";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Admin_Routes from "../components/Admin/Admin_Routes";
import User_Routes from "../components/User/User_Routes";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    ...Admin_Routes,
    ...User_Routes
  ]
})
