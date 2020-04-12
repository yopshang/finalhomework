import Vue from 'vue';
import App from './App.vue';
import router from '../router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import '../router/bus';

Vue.use(VueAxios, axios)
Vue.component('Loading',Loading);

axios.defaults.withCredentials = true;
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    console.log('這裡需要驗證');
  }else{
    next();
  }
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
