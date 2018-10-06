import axios from 'axios';

export const postItem = ({title, markdown, option, price, category}, config) => axios.post('/api/post/', {title, markdown, option, price, category}, config);
export const getPostItemById = (id, config) => axios.get(`/api/post/${id}`, config);
export const getPostItemList = (config) => axios.get('/api/post/', config);
export const deleteItemById = (id, config) => axios.delete(`/api/post/${id}`, config);
export const updateItemById = ({id, title, markdown, option, price, category}, config) => axios.patch(`/api/post/${id}`, {id, title, markdown, option, price, category}, config);

export const writeAfterPost = ({title, content, username, itemid}, config) => axios.post(`/api/post/after`, {title, content, username, itemid}, config);
export const getInitialAfterPostList = ({itemid}, config) => axios.get(`/api/post/after/initial/${itemid}`, config);
export const getMoreAfterPostList = ({itemid, lastId}, config) => axios.get(`/api/post/after/more/${itemid}/${lastId}`, config);

export const searchByTitle = ({title}, config) => axios.get(`/api/post/search/${title}`, config);

export const getAfterPostById = ({id}, config) => axios.get(`/api/post/after/${id}`, config);