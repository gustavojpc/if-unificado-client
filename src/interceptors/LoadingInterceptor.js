import Vue from 'vue';
import axios from 'axios';

// Interceptor responsável por Exibir e esconder
// o spinner em todas requisições AJAX
axios.interceptors.request.use(
  (config) => {
    if (!Vue.$loaderOverlay.disabled) {
      Vue.$loaderOverlay.show();
    }
    return config;
  },
);

axios.interceptors.response.use(
  (response) => {
    Vue.$loaderOverlay.hide();
    return response;
  },
  (error) => {
    Vue.$loaderOverlay.hide();
    return Promise.reject(error);
  },
);
