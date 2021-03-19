import Vue from 'vue';
import axios from 'axios';
import i18n from '@/i18n';
import { map as _map } from 'lodash';

// Interceptor responsável por tratar as requisições que tenham
// erro devido algum validação de negócio

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && typeof error.response.data === 'object') {
      // Object with attribute error with key i18n { error: 'error.nameOfError' }
      if (error.response.data.error) {
        Vue.$toast.error(i18n.t(error.response.data.error));
      } else {
        // Array
        const errorsValidation = _map(error.response.data, item => item);

        Vue.$toast.error(errorsValidation.join('<br/>'));
      }
    } else if (error.response && error.response.headers['content-type'] === 'text/html; charset=UTF-8' &&
      error.response.headers['pr-development-detail-error']) {
      const newWindow = window.open(null, '_blank', 'resizable=yes');
      newWindow.document.write(error.response.data);
      newWindow.document.close();
    } else {
      Vue.$toast.error('Serviço indisponível');
    }

    return Promise.reject(error);
  },
);
