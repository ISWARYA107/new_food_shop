import api from './axios';

export const placeOrder = (data) => api.post('/orders', data).then((res) => res.data);

export const getMyOrders = () => api.get('/orders/my').then((res) => res.data);

export const getAllOrders = (status = '') =>
  api.get(`/orders${status ? `?status=${status}` : ''}`).then((res) => res.data);

export const getOrderById = (id) => api.get(`/orders/${id}`).then((res) => res.data);

export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status }).then((res) => res.data);
