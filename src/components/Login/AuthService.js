import store from '../../store';

export default class AuthService {

  /**
   * Serviço especifico para realizar o login do sistema
   * @param {*} credentials objeto login e senha.
   * @param {*} noRedirect boolean para redirecionar depois do login.
   */
  static async login(credentials) {
    await store.dispatch('login', credentials);
  }
  static async register(register) {
    await store.dispatch('login', register);
  }
  static async logout() {
    await store.dispatch('logout');
  }
}
