import Vue from 'vue';
import App from './App.vue';
import router from '../router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import '../router/bus';
import currencyFilter from './fiters/currency.js';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Vue.I18n);
Vue.use(VueAxios, axios)
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);


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
  // i18n,
}).$mount('#app')


// const i18n=new VueI18n({
//   i18n,
//   distionary:{
//     zhTW,
//   }
// });