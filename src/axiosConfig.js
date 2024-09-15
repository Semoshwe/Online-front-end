import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/shopping_store', //this connects to the main application SpringBoot Application
  //timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
