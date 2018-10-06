import {createAction, handleActions} from 'redux-actions';

import {Map, List} from 'immutable';
import * as api from 'lib/api.editor';
import {pender} from 'redux-pender';

// action types
const EDITOR_IMAGE_UPLOAD = 'editor/EDITOR_IMAGE_UPLOAD';
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const GET_POST_ITEM_BY_ID = 'editor/GET_POST_ITEM_BY_ID';
const ON_POST_COMPLETED = 'editor/ON_POST_COMPLETED';
const ON_EDITOR_UNLOAD = 'editor/ON_EDITOR_UNLOAD';
const SELECT_CATEGORY = 'editor/SELECT_CATEGORY';

// action creator
export const editorImageUpload = createAction(EDITOR_IMAGE_UPLOAD, api.editorImageUpload);
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const getPostItemById = createAction(GET_POST_ITEM_BY_ID, api.getPostItemById);
export const onPostCompleted = createAction(ON_POST_COMPLETED, api.onPostCompleted);
export const onEditorUnload = createAction(ON_EDITOR_UNLOAD, api.onEditorUnload);
export const selectCategory = createAction(SELECT_CATEGORY);

// initial state
const initialState = Map({
    title: '', 
    markdown: '',
    option: '',
    price: '',
    imageName: '',
    category: 'no-category'
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value} = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: EDITOR_IMAGE_UPLOAD,
        onSuccess: (state, action) => {
            const { imageName } = action.payload.data;
            return state.set('markdown', state.get('markdown') + `![image](/api/uploads/image?imagename=${imageName}&istemp=true)`)
                        .set('imageName', imageName);
        }
    }),
    ...pender({
        type: GET_POST_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            const { title, markdown, options, prices } = item; 
            return state.set('title', title)
                        .set('markdown', markdown)
                        .set('option', options)
                        .set('price', prices);
        }
    }),
    ...pender({
        type: ON_EDITOR_UNLOAD,
        onSuccess: (state, action) => {
            console.log("UNLOADED");
        }
    }),
    [SELECT_CATEGORY]: (state, action) => {
        const { value } = action.payload;
        return state.set('category', value);
    }

}, initialState);