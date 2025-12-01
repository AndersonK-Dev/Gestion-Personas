import axios from "axios";

// Crea una instancia base.
// REEMPLAZA 'https://localhost:0000' con TU puerto real del backend
const api = axios.create({
  baseURL: "https://localhost:7138/api",
  headers: {
    "Content-Type": "application/json",
  },
});
//  SOLICITUD DE INGRESO
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Buscamos la llave en el bolsillo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Se la mostramos al guardia
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPUESTA
// Error de solicitud 401, salida de usuario
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirigir a login forzosamente
    }
    return Promise.reject(error);
  }
);

export default api;
