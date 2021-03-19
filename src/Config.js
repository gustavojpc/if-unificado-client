import axios from 'axios';
import { API_ENDPOINT } from './Config/dev.env';


// arquivo que tem as configurações globais
// to starterpack e das bibliotecas

axios.defaults.baseURL = API_ENDPOINT;

export const Global = {
  format: {
    displayDate: 'DD/MM/YYYY',
    displayDateTime: 'DD/MM/YYYY HH:mm',
    parseDate: 'YYYY-MM-DD',
    parseDateTime: 'YYYY-MM-DD HH:mm Z',
  },
};
