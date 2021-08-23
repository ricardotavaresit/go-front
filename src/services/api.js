import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gocontactback.herokuapp.com'
});

export default api;
