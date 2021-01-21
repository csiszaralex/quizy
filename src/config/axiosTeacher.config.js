import axios from 'axios';

const teacher = axios.create({
  baseURL: 'https://quizy5-default-rtdb.europe-west1.firebasedatabase.app/teachers',
});

export default teacher;
