// const API_BASE_URL = "http://localhost:8080/api";

// const endpoints = {
//   login: `${API_BASE_URL}/auth/login`,
//   usuarios: `${API_BASE_URL}/usuarios`,
//   pagamentos: `${API_BASE_URL}/pagamentos`,
// };

// export { API_BASE_URL, endpoints };

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;