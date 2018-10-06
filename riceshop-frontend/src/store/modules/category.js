import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as CategoryAPI from 'lib/api.category';
import { pender } from 'redux-pender';

// action types
const GET_ALL_CATEGORIES = 'category/GET_ALL_CATEGORIES';
const GET_ITEMS_BY_CATEGORY = 'category/GET_ITEMS_BY_CATEGORY';
const GET_ITEMS_BY_CATEGORY_INITIAL = 'category/GET_ITEMS_BY_CATEGORY_INITIAL';
const CHANGE_INPUT = 'category/CHANGE_INPUT';
const CREATE_CATEGORY = 'category/CREATE_CATEGORY';
const UPDATE_CATEGORY = 'category/UPDATE_CATEGORY';
const SET_CATEGORY_VERSION = 'category/SET_CATEGORY_VERSION';
const SET_ID = 'category/SET_ID';
const REMOVE_CATEGORY = 'category/REMOVE_CATEGORY';

// action creator
export const getAllCategories = createAction(GET_ALL_CATEGORIES, CategoryAPI.getAllCategories);
export const getItemsByCategory = createAction(GET_ITEMS_BY_CATEGORY, CategoryAPI.getItemsByCategory);
export const getItemsByCategoryInitial = createAction(GET_ITEMS_BY_CATEGORY_INITIAL, CategoryAPI.getItemsByCategoryInitial);
export const changeInput = createAction(CHANGE_INPUT);
export const createCategory = createAction(CREATE_CATEGORY, CategoryAPI.createCategory);
export const updateCategory = createAction(UPDATE_CATEGORY, CategoryAPI.updateCategory);
export const setCategoryVersion = createAction(SET_CATEGORY_VERSION);
export const setId = createAction(SET_ID);
export const removeCategory = createAction(REMOVE_CATEGORY, CategoryAPI.removeCategory);

// initial state
const initialState = Map({
    categories: List(),
    items: List(),
    input: Map({
        title: '',
        keyname: ''
    }),
    version: '',
    id: ''
});

// reducer
export default handleActions({
    ...pender({
        type: GET_ALL_CATEGORIES,
        onSuccess: (state, action) => {
            const { data: categories } = action.payload;
            return state.set('categories', fromJS(categories));
        }
    }),
    ...pender({
        type: GET_ITEMS_BY_CATEGORY,
        onSuccess: (state, action) => {
            const { data: items } = action.payload;
            return state.set('items', fromJS(items));
        }
    }),
    ...pender({
        type: GET_ITEMS_BY_CATEGORY_INITIAL,
        onSuccess: (state, action) => {
            const { data: items } = action.payload;
            return state.set('items', fromJS(items));
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    },
    [SET_CATEGORY_VERSION]: (state, action) => {
        const { payload: version } = action;
        return state.set('version', version);
    },
    [SET_ID]: (state, action) => {
        const { id } = action.payload;
        return state.set('id', id);
    }
}, initialState);