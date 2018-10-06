import axios from 'axios';

export const writeQna = ({title, content, username, password, isprivate}, config) => axios.post(`/api/qnabbs/`, {title, content, username, password, isprivate}, config);
export const writeAnswer = ({id, title, content}, config) => axios.post(`/api/qnabbs/answer/${id}`, {title, content}, config);
export const getQnaList = ({page}, config) => axios.get(`/api/qnabbs/?page=${page}`, config);
export const getQnaById = ({id}, config) => axios.get(`/api/qnabbs/${id}`, config);
export const getQnaListWithAnswers = ({page}, config) => axios.get(`/api/qnabbs/answers?page=${page}`, config);
export const removeQnaBbs = ({id}, config) => axios.delete(`/api/qnabbs/${id}`, config);
export const updateQnaBbs = ({id, title, content}, config) => axios.patch(`/api/qnabbs/${id}`, {title, content}, config);
export const updateAnswer = ({id, title, content}, config) => axios.patch(`/api/qnabbs/answer/${id}`, {title, content}, config);
export const removeAnswer = ({id}, config) => axios.delete(`/api/qnabbs/answer/${id}`, config);
export const search = ({value, filter}, config) => axios.post(`/api/qnabbs/search?filter=${filter}`, {value}, config);
export const checkPassword = ({password, id}, config) => axios.post(`/api/qnabbs/check`, {password, id}, config);
export const checkQnaAuth = ({id}, config) => axios.get(`/api/qnabbs/check/${id}`, config);