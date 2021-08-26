import axios from 'axios';

const instance = axios.create({
  headers: { 'X-Auth-Token': process.env.REACT_APP_MY_API_KEY },
  baseURL: 'https://api.football-data.org/v2',
});

export default instance;
