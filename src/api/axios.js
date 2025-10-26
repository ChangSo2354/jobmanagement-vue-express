import axios from "axios";

const api = axios.create({
  baseURL: 'https://node-express-job-2.onrender.com/api',
  withCredentials: true,
});


export default api