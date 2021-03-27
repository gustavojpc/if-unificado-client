<template>
  <v-app class="fill-height" id="app">
    <router-view></router-view>
    <v-snackbar
      :timeout="3000"
      :top="true"
      :right="true"
      :color="$toast.color"
      v-model="$toast.visible"
      class='toast'>

      <div class="toast-wrapper">
        <span class="toast-message" v-html="$toast.message"></span>

        <v-btn class="toast-btn-close" icon @click.native="$toast.visible = false">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </div>

    </v-snackbar>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        posts: []
      }
    }
  }
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap");

  html, body {
    margin: 0 !important;
    height: 100% !important;
    font-family: 'Montserrat', sans-serif !important;
  }
  .spinner {
    position: absolute;
    top: 0;
    z-index: 999999998;
    margin: 0 !important;
  }

  .toast {
    z-index: 999999999;
  }

  .toast div.v-snack__content {
    height: intrinsic !important;           /* Safari/WebKit uses a non-standard name */
    height: -moz-max-content !important;    /* Firefox/Gecko */
    height: -webkit-max-content !important; /* Chrome */
    display: table;
    height: auto !important;
  }

  .toast div.v-snack__content .toast-wrapper {
    display: table-row;
  }

  .toast div.v-snack__content .toast-wrapper .toast-message {
    display: table-cell;

  }

  .toast div.v-snack__content .toast-wrapper .toast-btn-close {
    text-align: right;
  }
</style>
