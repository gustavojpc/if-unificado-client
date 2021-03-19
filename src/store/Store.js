import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import mutations from './Mutations';
import actions from './Actions';
import getters from './Getters';

Vue.use(Vuex);

// Declaração da Store do sistema
// Nesta store deve ser colocada todas as informações que são compartilhadas entre
// todos os componentes
const store = new Vuex.Store({
  currentUser: null,
  token: null,
  selectedProjeto: null,
  plugins: [
    // Plugin utilizado para persistir o state da store no localstorage
    createPersistedState(),
  ],
  mutations,
  actions,
  getters,
});

export default store;
