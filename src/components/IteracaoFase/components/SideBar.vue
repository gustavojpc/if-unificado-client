<template>
  <div>
    <v-navigation-drawer style="float: left; height: 80%;" v-model="drawer" permanent>
        <v-list>
            <v-list-group :value="false" no-action prepend-icon="mdi-cogs">
                <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title >Configurações</v-list-item-title>
                </v-list-item-content>
                </template>

                <v-list-item link @click="openUpdateEsforcoDialog()">
                    <v-list-item-content>
                        <v-list-item-title>Editar esforço</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-group v-if="iteracaoFase" :value="false" no-action prepend-icon="mdi-text-box-multiple-outline">
                <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title >Artefatos</v-list-item-title>
                </v-list-item-content>
                </template>
                <v-list-item link v-for="item in iteracaoFase.artefatos" :key="item.id"
                @click="changeSelectedArtefato(item.id)">
                <v-list-item-content>
                    <v-list-item-title>{{item.templates.nome}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-group>
            </v-list>
    </v-navigation-drawer>
    <update-esforco v-if="iteracaoFase" v-model="esforcoDialog" :iteracaoFase="iteracaoFaseId" :esforco="iteracaoFase.esforco" >
    </update-esforco>
  </div>
</template>

<script>
import IteracaoFasesService from '../IteracaoFasesService';
import UpdateEsforco from './UpdateEsforco';

export default {
  name: 'side-bar',
  components: {
      UpdateEsforco,
    },
    props: ['iteracaoFaseId'],
    data() {
        return {
          isLoading: false,
          iteracaoFasesService: new IteracaoFasesService(),
          drawer: true,
          mini: false,
          dialog: false,
          esforcoDialog: false,
          iteracaoFase: null,
          selectedArtefato: null,
        }
    },
    methods: {
        async loadIteracoesFases() {
            this.isLoading = true;
            await this.iteracaoFasesService.request('GET', 'get-item', null, { params: {
                id: this.iteracaoFaseId,
            } }).then((response) => {
                this.iteracaoFase = response.data;
                this.isLoading = false;
            });
        },
        goToMainPage() {
            window.location.href = `/`;
        },
        changeSelectedArtefato(artefatoId) {
          // console.log(artefatoId);
          this.$emit('change-selected-artefato', artefatoId);
        },
        openUpdateEsforcoDialog(item) {
            this.esforcoDialog = true;
        },
    },
    async mounted() {
        this.loadIteracoesFases();
    }
}
</script>
<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    margin-left: 15px;
    /* margin-bottom: 0px; */
}
.body {
    min-height: 100%;
}

</style>
