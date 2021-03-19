<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-card >
        <v-card-title primary-title>
            Alterar esforço
        </v-card-title>
        <v-card-actions>
                <v-slider
                    v-model="newEsforco"
                    class="align-center"
                    max="100"
                    min="0"
                    hide-details
                >
                    <template v-slot:append>
                    <v-text-field
                        v-model="newEsforco"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                    ></v-text-field>
                    </template>
                </v-slider>
                <v-btn style="margin-left: 10px" dark target="_blank" @click="updateEsforco" color="blue">
                    Salvar
                    <v-icon right dark >
                        mdi-content-save
                    </v-icon>
                </v-btn>
        <!-- <v-btn color="primary" flat @click.stop="value=false">Close</v-btn> -->
        </v-card-actions>
    </v-card>


    </v-dialog>
  </div>
</template>
<script>
import IteracaoFasesService from '../IteracaoFasesService';

  export default {
    props: ['value', 'iteracaoFase', 'esforco'],
    data() {
        return {
            iteracaoFasesService: new IteracaoFasesService(),
            dialog: null,
            isLoading: false,
            newEsforco: this.esforco,
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
    methods: {
        async updateEsforco() {
            const params = {
                id: this.iteracaoFase,
                esforco: this.newEsforco,
            };
            this.isLoading = true;
            await this.iteracaoFasesService.request('POST', 'update-esforco', params).then((response)=>{
                if(response.status >= 200 && response.status <= 299) {
                    Vue.$toast.success('Operação realizada com sucesso');
                }
                this.isLoading = false;
                this.show = false;
            });
        },
    },
  }
</script>
