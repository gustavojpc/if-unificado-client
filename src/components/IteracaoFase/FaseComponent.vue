<template>
  <div class="body">
    <v-app-bar color="grey darken-4" dense dark>
          <v-icon @click="goToMainPage()">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>]
    </v-app-bar>
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
            <v-list-group :value="false" no-action prepend-icon="mdi-text-box-multiple-outline">
                <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title >Artefatos</v-list-item-title>
                </v-list-item-content>
                </template>
                <v-list-item link v-for="item in iteracaoFase.artefatos" :key="item.id"
                @click="openEditArtefatoDialog(item)">
                <v-list-item-content>
                    <v-list-item-title>{{item.templates.nome}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-group>
            </v-list>
    </v-navigation-drawer>
    <v-layout>
      <v-row justify="center" align="center">
        <v-col lg="12">
          <quill-editor
           :options="editorOpts">
          </quill-editor>
        </v-col>
      </v-row>
    </v-layout>
    <update-esforco v-if="iteracaoFase" v-model="esforcoDialog" :iteracaoFase="iteracaofaseid" :esforco="iteracaoFase.esforco" >
    </update-esforco>
  </div>
</template>

<script>
import IteracaoFasesService from './IteracaoFasesService';
import UpdateEsforco from './components/UpdateEsforco';
import { quillEditor } from 'vue-quill-editor';

export default {
  components: {
      UpdateEsforco,
      quillEditor,
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
          editorOpts: {
            modules: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike', 'link'],
                ['blockquote'],
                [{ header: 1 }, { header: 2 }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ size: ['small', 'normal', 'large', 'huge'] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean'],
              ],
            },
            placeholder: 'Insira aqui a descrição...',
          },
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
        openEditArtefatoDialog(item) {
            this.selectedArtefato = item,
            this.dialog = true;
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
