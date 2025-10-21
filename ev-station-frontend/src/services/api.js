import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // your backend API
});

// Attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Charger APIs (Phase 2)
export const getAllChargers = () => api.get("/chargers");
export const getFilteredChargers = (filters) => api.get("/chargers/search", { params: filters });
export const getChargerById = (id) => api.get(`/chargers/${id}`);

export default api;
