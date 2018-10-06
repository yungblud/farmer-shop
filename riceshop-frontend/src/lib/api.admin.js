import axios from 'axios';

export const adminLogin = ({adminID, password}, config) => axios.post(`/api/admin/`, {adminID, password}, config);
export const adminCheck = (config) => axios.post('/api/admin/check',config);
export const adminLogout = (config) => axios.post('/api/admin/logout',config);

