import axios from 'axios';

export const editorImageUpload = (fd, config) => axios.post(`/api/uploads/editor/image`, fd, config);
export const getPostItemById = (id, config) => axios.get(`/api/post/${id}`, config);
export const onPostCompleted = ({imageSrcs}, config) => axios.post(`/api/uploads/`, {imageSrcs}, config);
export const onEditorUnload = (config) => axios.post(`/api/uploads/unload`, {}, config);