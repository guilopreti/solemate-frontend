import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({ baseURL: BASE_URL });

// ---- PRODUTOS ----
export const getProdutos = (filtros = {}) =>
  api.get("/produtos", { params: filtros });

export const criarProduto = (formData) =>
  api.post("/produtos", formData);
// axios detecta FormData e define multipart/form-data automaticamente

export const atualizarProduto = (id, dados) =>
  api.put(`/produtos/${id}`, dados);

export const deletarProduto = (id) =>
  api.delete(`/produtos/${id}`);

// ---- CLIENTES ----
export const getClientes = () => api.get("/clientes");

export const criarCliente = (dados) => api.post("/clientes", dados);

export const atualizarCliente = (id, dados) =>
  api.put(`/clientes/${id}`, dados);

export const deletarCliente = (id) => api.delete(`/clientes/${id}`);

export const getPedidosCliente = (clienteId) =>
  api.get(`/clientes/${clienteId}/pedidos`);

// ---- PEDIDOS ----
export const getPedidos = () => api.get("/pedidos");

export const criarPedido = (dados) => api.post("/pedidos", dados);
