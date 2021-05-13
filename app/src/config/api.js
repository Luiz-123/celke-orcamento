import axios from 'axios';

const api = axios.create({
    baseURL: 'http://luizc04api-com-br.umbler.net'
});

export default api;