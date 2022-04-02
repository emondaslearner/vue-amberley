import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueCookies from 'vue-cookies'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


Vue.$cookies.config('7d')
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');

