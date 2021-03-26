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

      </v-container>


  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize-module";
import ArtefatoService from '../../artefatos/ArtefatosService';

Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'main-component',
  components: {
      VueEditor,
    },
    data() {
        return {
          artefatoService: new ArtefatoService(),
          selectedArtefato: null,
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
      openUpdateEsforcoDialog(item) {
          this.esforcoDialog = true;
      },
      async getSelectedArtefato(id) {
        await this.artefatoService.request('GET', 'get-artefato-by-id', null, { params:
          { id, },
        }).then((response) => {
          this.selectedArtefato = response.data;
        })

      }
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

</style>
