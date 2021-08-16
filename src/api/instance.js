import axios from 'axios';

const instance = axios.create({
  headers: { 'X-Auth-Token': 'aa4b54a0f9794e278339d9fd1f7ffc38' },
  baseURL: 'https://api.football-data.org/v2',
});

export default instance;
