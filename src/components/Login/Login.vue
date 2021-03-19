<template>
  <v-main class="content-white fill-height mb-0 pb-0 background">
     <v-container class="fill-height ">
        <v-row align="center" justify="center">
          <v-col lg="12" align="center" justify="center">
            <v-card max-width="500px" class="main-card">
              <v-card-title class="justify-center" justify="center">
                <h1 class="font-weight-bold display-3 basil--text">
                  IF Unificado
                </h1>
              </v-card-title>

              <v-tabs v-model="tab" background-color="transparent" color="green" grow>
                <v-tab key="login">
                  Login
                </v-tab>
                <v-tab key="registro">
                  Registro
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item key="login">
                  <v-card flat mt="1">
                      <v-text-field v-model="credentials.email" outlined placeholder="Digite seu email"></v-text-field>
                      <v-text-field v-model="credentials.password" outlined color placeholder="Digite sua senha"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                       :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      ></v-text-field>
                          <v-btn @click="login()" large dark color="#356859">Login</v-btn>
                  </v-card>
                </v-tab-item>
                <v-tab-item key="registro">
                  <v-card flat>
                      <v-text-field v-model="register.email" outlined placeholder="Digite seu email"></v-text-field>
                      <v-text-field v-model="register.name" outlined placeholder="Digite seu nome"></v-text-field>
                      <v-text-field v-model="register.password" outlined placeholder="Digite sua senha email"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                       :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"></v-text-field>
                          <v-btn @click="registerUser()" large dark color="#356859">Registrar</v-btn>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>




  </v-main>
</template>
<script>
import AuthService from './AuthService';

  export default {
    name: 'login',
    data () {
      return {
        tab: null,
        credentials: {
          email: 'admin@admin.com',
          password: 'admin123',
        },
        register: {
          email: null,
          name: null,
          password: null,
        },
        showPassword: false,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    methods: {
      async login() {
        try {
          await AuthService.login(this.credentials);
          const user = store.state.currentUser;
          console.log(user);
        } catch (err) {
          console.log(err);
        }
      },
      async registerUser() {
        try {
          await AuthService.register(this.register);
          const user = store.state.currentUser;
          console.log(user);
        } catch (err) {
          console.log(err);
        }
      }
    },
  }
</script>

<style scoped>
.main-card {
  border-radius: 18px;
  padding: 15px;
  border: 1px solid #356859;
}
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
.background {
  background-image: url("https://i.pinimg.com/originals/2a/76/17/2a761787715ca71788aad1a28ab057ac.jpg");
  background-size: cover;
  min-height: 100%;
}
</style>
