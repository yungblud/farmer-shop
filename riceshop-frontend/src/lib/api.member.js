import axios from 'axios';

export const register = ({userID, userPassword, userEmail, userName, userAddress, userPostCode, userDetailAddress, userPhone}, config) => axios.post('/api/member/', {userID, userPassword, userEmail, userName, userAddress, userPostCode, userDetailAddress, userPhone}, config);
export const login = ({userID, userPassword}, config) => axios.post('/api/member/login', {userID, userPassword}, config);
export const check = (config) => axios.post('/api/member/check', config);
export const logout = (config) => axios.post('/api/member/logout', config);
export const settingCheck = ({id}, config) => axios.post(`/api/member/setting`, {id}, config);

export const changeUserInfo = ({id, value, type}, config) => axios.post(`/api/member/change/${type}`, {id, value}, config);
