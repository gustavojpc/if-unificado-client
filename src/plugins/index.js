import Vue from 'vue'
import Vuetify from 'vuetify'
import PrLoading from './LoadingPlugin';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueQuillEditor from 'vue-quill-editor';
import Vue2Editor from "vue2-editor";
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css'

import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(PrLoading);
Vue.use(Loading, {
  color: '#356859',
});
Vue.use(Vue2Editor);
