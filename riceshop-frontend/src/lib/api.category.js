import axios from 'axios';

export const getAllCategories = () => axios.get(`/api/category/`);
export const getItemsByCategory = ({category}) => axios.get(`/api/category/${category}`);
export const getItemsByCategoryInitial = ({category}) => axios.get(`/api/category/initial/${category}`);
export const createCategory = ({title, keyname}) => axios.post(`/api/category/`, {title, keyname});
export const updateCategory = ({id, title, keyname}) => axios.patch(`/api/category/${id}`, {title, keyname});
export const removeCategory = ({id}) => axios.delete(`/api/category/${id}`);