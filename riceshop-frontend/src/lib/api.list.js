import axios from 'axios';

// export const getLastId = () =>
export const getListItem = ({lastId}, config) => axios.get(`/api/post/more/${lastId}`, config);
export const getInitialList = (config) => axios.get('/api/post/initial', config);