/**
  * Plugin responsável por controlar a exibição do component PrLoaderOverlay
 */
 export default {
  install(Vue) {
    const plugin = new Vue({
      data() {
        return {
          loader: false,
          disabled: false,
        };
      },
      methods: {
        show() {
          if (this.loader) this.loader.hide();
          this.loader = this.$loading.show();
        },
        hide() {
          if (this.loader) this.loader.hide();
        },
      },
    });

    Vue.$loaderOverlay = plugin;
    Vue.prototype.$loaderOverlay = plugin;
  },
};
