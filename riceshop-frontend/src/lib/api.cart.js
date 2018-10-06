import axios from 'axios';

export const addCart = ({id, title, amount, thumbnailImage, totalPrice, option, ver}, config) => axios.post('/api/cart/', {id, title, amount, thumbnailImage, totalPrice, option, ver}, config);
export const getCartList = (config) => axios.get('/api/cart/', config);
export const removeCartById = (id, config) => axios.delete(`/api/cart/${id}`, config);
export const removeCart = (config) => axios.delete(`/api/cart/`, config);