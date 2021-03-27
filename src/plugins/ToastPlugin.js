/**
 * PLugin responsável pelo controle do component PrToast
 */
export default {
  install(Vue) {
    const plugin = new Vue({
      data() {
        return {
          visible: false,
          message: '',
          color: 'default',
        };
      },
      methods: {
        /**
         * Metodo responsavel por exibir o toast.
         * @param {*} message
         */
        show(message) {
          this.hide();
          this.visible = true;
          this.message = message;
        },
        /**
         * Metodo reponsavel por esconder o toast.
         */
        hide() {
          this.visible = false;
        },
        /**
         * Metodod responsavel por exibir toast de erro.
         * @param {*} message
         */
        error(message) {
          this.color = 'error';
          this.show(message);
        },
        /**
         * Metodod responsavel por exibir toast de info.
         * @param {*} message
         */
        info(message) {
          this.color = 'info';
          this.show(message);
        },
        /**
         * Metodod responsavel por exibir toast de warning.
         * @param {*} message
         */
        warning(message) {
          this.color = 'warning';
          this.show(message);
        },
        /**
         * Metodod responsavel por exibir toast de sucesso.
         * @param {*} message
         */
        success(message) {
          this.color = '#53A653';
          this.show(message);
        },
      },
    });

    Vue.$toast = plugin;
    Vue.prototype.$toast = plugin;
  },
};
