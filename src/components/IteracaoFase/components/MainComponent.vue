<template>
  <div >

    <v-container v-if="selectedArtefato" class="">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(titulo, index)  in selectedArtefato.artefatos_titulos" :key="titulo.id">
          <v-expansion-panel-header class="titulo">{{index + 1}}. {{titulo.titulo.nome}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <vue-editor
            v-model="selectedArtefato.artefatos_titulos[index].descricao"
            :editorOptions="editorOpts">
            </vue-editor>
              <v-flex class="subtitulo-card" v-for="(subtitulo, subtituloIndex)  in titulo.artefatos_titulos_subtitulos" :key="subtitulo.id" >
                <span class="subtitulo-text">{{index + 1}}.{{subtituloIndex + 1}}. {{subtitulo.subtitulo.nome}} </span>
                  <vue-editor
                  v-model="selectedArtefato.artefatos_titulos[index].artefatos_titulos_subtitulos[subtituloIndex].descricao"
                  :editorOptions="editorOpts">
                  </vue-editor>
              </v-flex>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <v-flex class="btn-salvar" xs12 offset-xs11> -->
        <v-btn @click="openGeneratePDFDialog()" color="success">Gerar PDF</v-btn>
        <v-btn @click="saveArtefato()" color="success">Salvar</v-btn>
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png">
      <!-- </v-flex> -->
    </v-container>
    <generate-pdf v-model="show" :selectedArtefato="selectedArtefato">
    </generate-pdf>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import ArtefatoService from '../../artefatos/ArtefatosService';
import GeneratePdf from './GeneratePdf';

Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'main-component',
  components: {
      VueEditor,
      GeneratePdf,
    },
    data() {
      return {
        artefatoService: new ArtefatoService(),
        selectedArtefato: null,
        show: false,
        editorOpts: {
          modules: {
            imageResize: {},
            toolbar: [
              ['bold', 'italic', 'underline','image', 'link'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
          placeholder: 'Insira aqui a descrição...',
        },
      }
    },
    methods: {
      openGeneratePDFDialog() {
        this.show = true;
      },
      async getSelectedArtefato(id) {
        await this.artefatoService.request('GET', 'get-artefato-by-id', null, { params:
          { id, },
        }).then((response) => {
          this.selectedArtefato = response.data;
        })
      },
      async saveArtefato() {
        await this.artefatoService.request('PUT', 'updated-artefato-titulos-subtitulos', this.selectedArtefato).then(() => {
          this.$toast.success('Operação realizada com sucesso');
          console.log('dsa');
        });
      },
    },
    destroyed() {
      this.$root.$off('selected-artefato')
    },
    async mounted() {
      this.$root.$on('selected-artefato', (artefatoId) => {
        this.getSelectedArtefato(artefatoId);
      });
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
.titulo{
  font-size: 1.4rem;
  font-weight: 800;
}

.subtitulo-card{
  margin-top: 15px;
  margin-left: 20px;
}
.subtitulo-text{
  margin-bottom: 10px;
}

.btn-salvar{
  margin-top: 25px;
}

</style>
