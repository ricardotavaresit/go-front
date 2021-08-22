import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300'
});

export default api;
