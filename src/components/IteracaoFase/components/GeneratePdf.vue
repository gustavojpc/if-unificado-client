<template>
  <div class="text-center">
    <v-dialog v-model="show" width="400" transition="dialog-transition">
    <v-card class="justify-center" elevation="1" max-width="">
        <v-card-title class="justify-center" primary-title>
            Relatório {{selectedArtefato.templates.nome}}
        </v-card-title>
        <v-card-actions class="justify-center">

          <v-btn :loading="pdfIsGenerating" dark @click="generateReport" color="blue">
              {{ btnText }}
              <v-icon right dark >
                {{ btnIcon }}
              </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :paginate-elements-by-height="1400"
        filename="Download"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @beforeDownload="beforeDownload($event)"
        @hasDownloaded="hasDownloaded($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
          <p class="titulo-principal">Artefato {{selectedArtefato.templates.nome}} </p>
          <div v-for="(titulo, index)  in selectedArtefato.artefatos_titulos" :key="titulo.id">
            <h3>{{index + 1}}. {{titulo.titulo.nome}}</h3>
              <p v-html="selectedArtefato.artefatos_titulos[index].descricao"></p>
              <div v-for="(subtitulo, subtituloIndex)  in titulo.artefatos_titulos_subtitulos" :key="subtitulo.id">
                <h1>{{index + 1}}.{{subtituloIndex + 1}}. {{subtitulo.subtitulo.nome}}</h1>
                <p v-html="selectedArtefato.artefatos_titulos[index].artefatos_titulos_subtitulos[subtituloIndex].descricao">
                </p>
              </div>
          </div>
        </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name:'generate-pdf',
  props: ['value','selectedArtefato'],
  data() {
    return {
      isLoading: false,
      newEsforco: this.esforco,
      pdfIsGenerating: false,
      btnText: 'Download',
      btnIcon: 'mdi-download',
    }
  },
  computed: {
    show: {
      get () {
          return this.value
      },
      set (value) {
          this.$emit('input', value)
      }
    }
  },
  components: {
    VueHtml2pdf,
  },
  methods: {
    beforeDownload () {
      this.pdfIsGenerating = true;
    },
    hasDownloaded() {
      this.pdfIsGenerating = false;
      this.btnText = 'Gerar novamente';
      this.btnIcon = 'mdi-refresh';
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  }
}
</script>
<style>
.titulo-principal {
  text-align: center;
}
</style>
