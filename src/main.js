import Vue from 'vue'
import store from './store'
import router from './router'
import axios from 'axios'


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import $ from 'jquery'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

axios.defaults.baseURL = 'http://163.47.115.230:30000';
let token = localStorage.getItem('token')

if(token){
  axios.defaults.headers.common['authorization'] = token;
}

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.authorization =  token

  return config;
});

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
