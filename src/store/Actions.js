import axios from 'axios';
import * as types from './MutationTypes';
import { API_ENDPOINT } from '../Config/dev.env';



export default {
  /**
   * Realiza o login do sistema e guarda as informações
   * do usuário e token
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} credentials email e senha do usuário
   */

  login({ commit }, credentials) {
    // axios.defaults.baseURL = API_ENDPOINT;
    return axios.post('auth/login', credentials)
      .then((response) => {
        commit(types.UPDATE_USER, response.data.user);
        commit(types.UPDATE_TOKEN, response.data.token);
        window.location.href = '#/home';
        return response.user;
      });
  },

  /**
   * Realiza o registro do sistema e guarda as informações
   * do usuário e token
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} credentials email e senha do usuário
   */

  register({ commit }, register) {
    // axios.defaults.baseURL = API_ENDPOINT;
    return axios.post('register', register)
      .then((response) => {
        commit(types.UPDATE_USER, response.data.user);
        commit(types.UPDATE_TOKEN, response.data.token);
        window.location.href = '#/home';
        return response.user;
      });
  },


  /**
   * Realiza o logout do sistema, para isso basta apagar todas as informações
   * do state que são relativas a autenticação
   * @param {*} commit, função derivada do contexto da store
   */
  logout({ commit }) {
    return axios.post('logout')
      .then((response) => {
        commit(types.UPDATE_USER, null);
        commit(types.UPDATE_TOKEN, null);
        commit(types.UPDATE_PROJETO, null);
        window.location.href = '#/';
        return response.user;
      });

  },

  /**
   * Atualiza o projeto selectionado
   * @param {*} commit, função derivada do contexto da store
   */
   updateCurrentProjeto({ commit }, projeto) {
    commit(types.UPDATE_PROJETO, projeto);
  },
   updateCurrentUser({ commit }, projeto) {
    commit(types.UPDATE_TOKEN, projeto);
  },
   updateCurrentToken({ commit }, projeto) {
    commit(types.UPDATE_USER, projeto);
  },
};
