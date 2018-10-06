import axios from 'axios';

export const findUserId = ({to, userName, userEmail}) => axios.post(`/api/mail/username`, {to, userName, userEmail});
export const findPassword = ({to, userId, userEmail}) => axios.post(`/api/mail/password`, {to, userId, userEmail});