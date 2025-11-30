import axios from 'axios';

const client = axios.create({
  baseURL: 'https://dreamweaverss.store',
  timeout: 15000,
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
