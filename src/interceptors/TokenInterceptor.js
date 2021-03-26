import axios from 'axios';
import store from '../store';
import router from '../router';
import * as types from '../store/MutationTypes';

/**
 * Função responsável por atualizar o token no store com base
 * no que vem na resposta da requisição
 * @param {Resposta da requisição} response
 */
function refreshToken(response) {
  if (response.headers.authorization) {
    const token = response.headers.authorization;

    store.commit(types.UPDATE_TOKEN, token.split(' ')[1]);
  }
}

/**
 * Função responsável por verificar e tratar erros na
 * requisição devirados de problema com o token
 * @param {Resposta da requisição} response
 */
function checkAndTraitTokenError(response) {
  const responseData = response.data;

  store.dispatch('updateCurrentToken', null);
  store.dispatch('updateCurrentUser', null);
  store.dispatch('updateCurrentProjeto', null);
  router.push('/');
}

// Este interceptor é responsável por cuidar de todo o tratamento para envio e recebimento do token
axios.interceptors.request.use(
  (config) => {
    const token = store.state.token;

    if (token) {
      config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${token}` });
    }

    return config;
  },
);

axios.interceptors.response.use(
  (response) => {
    refreshToken(response);

    return response;
  },
  (error) => {
    // verifica se tem algum erro de token somente se tiver um response
    // algumas requisições não chegam a complemetar e com isso não geram um response
    if (error.response && checkAndTraitTokenError(error.response)) {
      const errorData = {
        error: 'messages.login.logoutInactive',
      };

      // Se der erro de token substitui a chave de erro específca de token para uma
      // gerénica de usário inativo
      return Promise.reject(Object.assign({}, error, { response: { data: errorData } }));
    }

    return Promise.reject(error);
  },
);
