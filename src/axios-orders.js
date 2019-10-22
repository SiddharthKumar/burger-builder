import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burger-builder-8cac6.firebaseio.com/"
});

export default instance;