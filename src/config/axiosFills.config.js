import axios from 'axios';

const fills = axios.create({
  baseURL: 'https://quizy5-default-rtdb.europe-west1.firebasedatabase.app/fills',
});

export default fills;
