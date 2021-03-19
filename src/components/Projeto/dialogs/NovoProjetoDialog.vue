<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>

      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="white" light small>
            Novo projeto
            <v-icon>mdi-plus</v-icon>
        </v-btn>

      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Novo projeto
        </v-card-title>

        <v-card-text>
             <v-container >
                <v-row>
                  <v-col md="12">
                      <v-text-field placeholder="Digite aqui o nome do projeto"
                        v-model="projetoNome" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="novoProjeto"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProjetoService from '../ProjetoService';

  export default {
    name: 'novo-projeto-dialog',
    data() {
        return {
            projetoNome: null,
            projetoService: new ProjetoService(),
            dialog: null,
            isLoading: false,
        }
    },
    methods: {
        novoProjeto() {
            this.isLoading = true;
            this.projetoService.request('POST', 'novo-projeto', { nome: this.projetoNome }).then((response)=>{
                if(response.status >= 200 && response.status <= 299) {
                    Vue.$toast.success('Operação realizada com sucesso');
                }
                this.$emit('close-dialog', response.data);
                this.dialog = false;
                this.isLoading = false;
            });
        },
    },
  }
</script>
