import axios from 'axios';

export const getCheckoutList = ({
    filter
}, config) => axios.get(`/api/payment/?filter=${filter}`, config);
export const getCheckoutById = (id, config) => axios.get(`/api/payment/${id}`, config);
export const getUncheckedList = (config) => axios.get('/api/payment/unchecked', config);

export const search = ({
    filter,
    value
}, config) => axios.get(`/api/payment/search?filter=${encodeURI(filter)}&value=${encodeURI(value)}`, config);
export const setChecked = (id, songjang, config) => axios.post(`/api/payment/check/${id}/${songjang}`, config);

export const getUserCheckoutList = ({
    userID
}, config) => axios.get(`/api/payment/user/${userID}`, config);
export const getUserCheckoutById = ({
    userID,
    id
}, config) => axios.get(`/api/payment/user/${userID}/${id}`, config);

export const getParcelCrawledData = ({
    songjang
}, config) => axios.get(`/api/crawling/${songjang}`, config);

export const setCancel = ({
    id
}, config) => axios.post(`/api/payment/cancel/${id}`, config);
export const setPayback = ({
    id
}, config) => axios.post(`/api/payment/payback/${id}`, config);
export const setComplete = ({
    id,
    userID
}, config) => axios.post(`/api/payment/complete/${id}`, {
    userID
}, config);

export const updateSongjangNumberWithApi = ({id, songjang}, config) => axios.post(`/api/payment/check/${id}/${songjang}`, config);

export const cancelCheck = ({id}, config) => axios.post(`/api/payment/cancel/check/${id}`, config);

export const getUserCheckoutListByFilter = ({userID, filter}, config) => axios.post(`/api/payment/user?filter=${filter}`, {userID}, config);