<template>
  <div class="body">
    <v-app-bar color="grey darken-4" dense dark>
          <v-icon @click="goToMainPage()">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>]
    </v-app-bar>
    <side-bar @change-selected-artefato="changeSelectedArtefato" :iteracaoFaseId="iteracaoFaseId">

    </side-bar>
    <v-layout>
      <v-row justify="center" align="center">
        <v-col lg="12">
          <main-component>
          </main-component>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import IteracaoFasesService from './IteracaoFasesService';
import UpdateEsforco from './components/UpdateEsforco';
import { quillEditor } from 'vue-quill-editor';
import SideBar from './components/SideBar.vue';
import MainComponent from './components/MainComponent.vue';

export default {
  props: ['iteracaoFaseId'],
  components: {
    UpdateEsforco,
    quillEditor,
    SideBar,
    MainComponent,
  },
  methods: {
    changeSelectedArtefato(artefatoId) {
      this.$root.$emit('selected-artefato', artefatoId);
    }
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
