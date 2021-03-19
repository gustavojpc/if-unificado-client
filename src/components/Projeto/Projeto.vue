<template>
    <div>
      <v-app-bar color="grey darken-4" dense dark>
        <novo-projeto-dialog @close-dialog="closingDialog">
        </novo-projeto-dialog>
        <v-select v-if="items" class="custom-select" placeholder="Selecione o projeto"
          @change="changeSelectedProjeto()"
          height="10px"
          no-data-text="Nenhum projeto encontrado"
          background-color="grey darken-4"
          color="white" item-text="nome" item-value="id" v-model="selectedProjeto" :items="items" filled
          return-object>
        </v-select>
        <v-spacer></v-spacer>
        <v-btn @click="logout()" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <div v-if="projeto" style="margin-top: 20px">
        <v-sheet class="mx-auto" elevation="8">
          <v-slide-group
            v-for="iteracao in projeto.iteracoes"  :key="iteracao.id"
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
            >
            <v-slide-item v-for="iteracao_fase in iteracao.iteracoes_fases"  :key="iteracao_fase.id" class="pr-3">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-card class="card-iteracao" @click="goToIteracaoFase(iteracao_fase.id)" v-bind="attrs" v-on="on" outlined tile hover>
                      <v-progress-linear
                          :value="iteracao_fase.esforco"
                          :color="iteracao_fase.fases.cor"
                          height="70">
                      </v-progress-linear>
                      <v-card-text class="fase-name text-center">
                          {{ iteracao_fase.fases.nome }}
                      </v-card-text>
                    </v-card>
                </template>
                <span>
                  <b> {{ iteracao_fase.fases.nome }} </b> : {{ iteracao_fase.esforco }}</span>
              </v-tooltip>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>
      <v-container >
        <v-row justify="end" class="butoes">
          <v-col md="4">
            <!-- <v-btn elevation="1" dark color="red darken-1" >Excluir Iteração</v-btn> -->
            <v-btn elevation="1" dark color="indigo darken-2" @click="createIteracao()">Nova Iteração</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import ProjetoService from './ProjetoService';
import IteracoesService from '../Iteracoes/IteracoesService';
import AuthService from '../Login/AuthService';
import NovoProjetoDialog from './dialogs/NovoProjetoDialog.vue';

export default {
  components: { NovoProjetoDialog },
    data() {
      return {
        projetoService: new ProjetoService(),
        iteracoesService: new IteracoesService(),
        projeto: null,
        model: null,
        items: [],
        selectedProjeto: null,
      }
    },
    methods: {
      async logout() {
        try {
          await AuthService.logout();
          // const user = store.state.currentUser;
          // console.log(user);
        } catch (err) {
          console.log(err);
        }
      },
      async getProjetoById() {
        if (this.currentProjeto) {
            await this.projetoService.request('GET', 'get-projeto-by-id', null, { params: { id: this.currentProjeto.id} }).then((response) => {
              this.projeto = response.data;
            })
        } else {
            this.projeto = {};
        }
      },
      async getProjetoList() {
        await this.projetoService.request('GET', 'get-projeto-list', null, { params: { id: this.currentUser.id} }).then((response) => {
            this.items = response.data;
        })
      },
      async createIteracao() {
            await this.iteracoesService.request('POST', 'nova-iteracao', { projeto_id: this.currentProjeto.id }).then(() => {
                this.getProjetoById();
            })
      },
      closingDialog(newProjeto) {
        this.$store.dispatch('updateCurrentProjeto', newProjeto);
        this.getProjetoById();
      },
      goToIteracaoFase(id){
        const params = {
          iteracaoFaseId: id
        };
        this.$router.push({ name: 'fase', params });
      },
      changeSelectedProjeto(){
        this.$store.dispatch('updateCurrentProjeto', this.selectedProjeto);
        this.getProjetoById();
      }
    },
     computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters({
        currentUser: 'GET_CURRENT_USER',
        currentProjeto: 'GET_CURRENT_PROJETO',
      }),
    },
    watch: {
      currentProjeto() {
        this.selectedProjeto = this.currentProjeto;
        this.getProjetoById();
      }
    },
    async created() {
        if(this.currentProjeto) this.selectedProjeto = this.currentProjeto.id
        await this.getProjetoList();
        await this.getProjetoById();
    },
}
</script>
<style scoped>
.custom-select {
    width: 50px !important;
    margin-left: 50px !important;
}
.fase-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.butoes{
    margin-bottom: 50px;
}
.card-iteracao{
    width: 200px !important;
    margin-right: 30px;
}
.custom-select >>> .v-input {
    flex: none;
}
.custom-select >>> .v-text-field .v-input__append-inner {
    align-self: center !important;
}
.custom-select >>> .v-select__slot {
    align-items: flex-end !important;
}
</style>

