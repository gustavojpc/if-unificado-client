import Vue from 'vue'
import App from './App.vue'
import './plugins';
import './Config';
import inject from './VueInstanceInject';
import vuetify from './plugins/vuetify';
import './interceptors';
// import '@mdi/font/css/materialdesignicons.css'

new Vue({
  ...inject,
  vuetify,
  el: '#app',
  render: h => h(App)
})
