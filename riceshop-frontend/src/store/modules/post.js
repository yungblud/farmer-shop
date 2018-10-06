import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.post';
import { pender } from 'redux-pender';
// action types
const POST_ITEM = 'post/POST_ITEM';
const INITIALIZE = 'post/INITIALIZE';
const INITIALIZE_AFTER_POST_EDITOR = 'post/INITIALIZE_AFTER_POST_EDITOR';
const GET_POST_ITEM_BY_ID = 'post/GET_POST_ITEM_BY_ID';
const SELECTOR_CHANGED = 'post/SELECTOR_CHANGED';
const NUMBER_CHANGED = 'post/NUMBER_CHANGED';
const GET_POST_ITEM_LIST = 'post/GET_POST_ITEM_LIST';
const DELETE_ITEM_BY_ID = 'post/DELETE_ITEM_BY_ID';
const UPDATE_ITEM_BY_ID = 'post/UPDATE_ITEM_BY_ID';
const RESET_ERROR_MESSAGE = 'post/RESET_ERROR_MESSAGE';
const SHOW_MARKDOWN = 'post/SHOW_MARKDOWN';
const SHOW_AFTER = 'post/SHOW_AFTER';
const SHOW_PAYBACK = 'post/SHOW_PAYBACK';
const SET_IS_BOUGHT = 'post/SET_IS_BOUGHT';
const CHANGE_INPUT = 'post/CHANGE_INPUT';
const WRITE_AFTER_POST = 'post/WRITE_AFTER_POST';
const GET_INITIAL_AFTER_POST_LIST = 'post/GET_INITIAL_AFTER_POST_LIST';
const GET_MORE_AFTER_POST_LIST = 'post/GET_MORE_AFTER_POST_LIST';
const SEARCH_BY_TITLE = 'post/SEARCH_BY_TITLE';
const INITIALIZE_SEARCH = 'post/INITIALIZE_SEARCH';
const GET_AFTER_POST_BY_ID = 'post/GET_AFTER_POST_BY_ID';
const PRESS_UP_BUTTON = 'post/PRESS_UP_BUTTON';
const PRESS_DOWN_BUTTON = 'post/PRESS_DOWN_BUTTON';


// action creator
export const postItem = createAction(POST_ITEM, api.postItem);
export const getPostItemById = createAction(GET_POST_ITEM_BY_ID, api.getPostItemById);
export const selectorChanged = createAction(SELECTOR_CHANGED);
export const numberChanged = createAction(NUMBER_CHANGED);
export const initialize = createAction(INITIALIZE);
export const getPostItemList = createAction(GET_POST_ITEM_LIST, api.getPostItemList);
export const deleteItemById = createAction(DELETE_ITEM_BY_ID, api.deleteItemById);
export const updateItemById = createAction(UPDATE_ITEM_BY_ID, api.updateItemById);
export const resetErrorMessage = createAction(RESET_ERROR_MESSAGE);
export const showMarkdown = createAction(SHOW_MARKDOWN);
export const showAfter = createAction(SHOW_AFTER);
export const showPayback = createAction(SHOW_PAYBACK);
export const setIsBought = createAction(SET_IS_BOUGHT);
export const changeInput = createAction(CHANGE_INPUT);
export const writeAfterPost = createAction(WRITE_AFTER_POST, api.writeAfterPost);
export const getInitialAfterPostList = createAction(GET_INITIAL_AFTER_POST_LIST, api.getInitialAfterPostList);
export const getMoreAfterPostList = createAction(GET_MORE_AFTER_POST_LIST, api.getMoreAfterPostList);
export const initializeAfterPostEditor = createAction(INITIALIZE_AFTER_POST_EDITOR);
export const searchByTitle = createAction(SEARCH_BY_TITLE, api.searchByTitle);
export const initializeSearch = createAction(INITIALIZE_SEARCH);
export const getAfterPostById = createAction(GET_AFTER_POST_BY_ID, api.getAfterPostById);
export const pressUpButton = createAction(PRESS_UP_BUTTON);
export const pressDownButton = createAction(PRESS_DOWN_BUTTON);

// initial state
const initialState = Map({
    itemId: '',
    item: Map({}),
    eachPrice: 0,
    totalPrice: 0,
    number: 1,
    postItemList: List(),
    selectedOption: '',
    error: Map({
        errorCode: 0,
        errorLog: ''
    }),
    visible: Map({
        markdown: true,
        after: false,
        payback: false
    }),
    bought: false,
    title: '',
    content: '',
    afterPost: Map({}),
    afterPostList: List(),
    lastId: '',
    afterPostMinId: null,
    searchedList: List(),
    search: '',
    isSearched: false,
    existingCategories: List(),
});

// reducer
export default handleActions({
    ...pender({
        type: POST_ITEM,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('itemId', item.id);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.setIn(['error', 'errorCode'], errorCode)
                        .setIn(['error', 'errorLog'], errorLog);
        }
    }),
    ...pender({
        type: GET_POST_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('item', fromJS(item))
                        .set('selectedOption', item.options.split(",")[0]);
        }
    }),
    [SELECTOR_CHANGED]: (state, action) => {
        // console.log(act)
        const { value, option } = action.payload;
        return state.set('eachPrice', parseInt(value, 10))
                    .set('totalPrice', parseInt(value, 10))
                    .set('number', 1)
                    .set('selectedOption', option);
    },
    [INITIALIZE]: (state, action) => {
        const { initialPrice } = action.payload;

        return state.set('eachPrice', initialPrice)
                    .set('totalPrice', initialPrice)
                    .set('number', 1);
    },
    [NUMBER_CHANGED]: (state, action) => {
        const { value } = action.payload;
        const eachPrice = parseInt(state.get('eachPrice'), 10);
        if(value === "") {
            return state.set('totalPrice', 1 * eachPrice)
                        .set('number', "");
        }
        if(value <= 0) {
            return state.set('totalPrice', 1 * eachPrice)
                        .set('number', 1);
        }
        return state.set('totalPrice', parseInt(value, 10) * eachPrice)
                    .set('number', parseInt(value, 10));
    },
    ...pender({
        type: GET_POST_ITEM_LIST,
        onSuccess: (state, action) => {
            const { data: postItemList } = action.payload;
            let newItemList = [];
            for(let i = 0;i < 8;i++) {
                if(postItemList[i]) {
                    newItemList.push(postItemList[i]);
                }
                
               
            }

            let categories = [];
            
            for(let i = 0;i < postItemList.length;i++) {
                let checker = false;
                for(let j = 0;j < categories.length;j++) { 
                    if(categories[j] === postItemList[i].category) {
                        checker = true;
                    }
                }
                if(!checker) {
                    categories.push(postItemList[i].category);
                }
            }
            if(newItemList.length > 0) {
                return state.set('postItemList', newItemList)
                            .set('existingCategories', fromJS(categories));
            } 
            return state.set('existingCategories', fromJS(categories));
            
        }
    }),
    ...pender({
        type: UPDATE_ITEM_BY_ID,
        onSuccess: (state, action) => {
            const { data: item } = action.payload;
            return state.set('itemId', item.id);


        }
    }),
    [RESET_ERROR_MESSAGE]: (state, action) => {
        return state.setIn(['error', 'errorCode'], 0)
                    .setIn(['error', 'errorLog'], '');
    },
    [SHOW_MARKDOWN]: (state, action) => {
        return state.setIn(['visible', 'markdown'], true)
                    .setIn(['visible', 'after'], false)
                    .setIn(['visible', 'payback'], false);
    },
    [SHOW_AFTER]: (state, action) => {
        return state.setIn(['visible', 'markdown'], false)
                    .setIn(['visible', 'after'], true)
                    .setIn(['visible', 'payback'], false);
    },
    [SHOW_PAYBACK]: (state, action) => {
        return state.setIn(['visible', 'markdown'], false)
                    .setIn(['visible', 'after'], false)
                    .setIn(['visible', 'payback'], true);
    },
    [SET_IS_BOUGHT]: (state, action) => {
        const { isBought } = action.payload;
        return state.set('bought', isBought);
    },
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_AFTER_POST,
        onSuccess: (state, action) => {
            const { data: afterPost } = action.payload;
            return state.set('afterPost', afterPost);
        }
    }),
    ...pender({
        type: GET_INITIAL_AFTER_POST_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            if(list.length > 0) {
                return state.set('afterPostList', fromJS(list))
                        .set('lastId', list[list.length - 1].id);
            }

            return state.set('afterPostList', fromJS(list));
            
        }
    }),
    ...pender({
        type: GET_MORE_AFTER_POST_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            const afterPostList = state.get('afterPostList');
            const minId = action.payload.headers['minid'];
            if(list.length === 0) {
                return state;
            }
            return state.set('afterPostList', afterPostList.concat(fromJS(list)))
                        .set('lastId', list[list.length - 1].id)
                        .set('afterPostMinId', minId);
        }
    }),
    [INITIALIZE_AFTER_POST_EDITOR]: (state, action) => {
        return state.set('title', '')
                    .set('content', '');
    },
    ...pender({
        type: SEARCH_BY_TITLE,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('searchedList', fromJS(list))
                        .set('isSearched', true);
        }
    }),
    [INITIALIZE_SEARCH]: (state, action) => {
        return state.set('isSearched', false)
                    .set('searchedList', List())
                    .set('search', '');
    },
    ...pender({
        type: GET_AFTER_POST_BY_ID, 
        onSuccess: (state, action) => {
            const { data: afterPost } = action.payload;
            return state.set('afterPost', afterPost);
        }
    }),
    [PRESS_UP_BUTTON]: (state, action) => {
        const number = parseInt(state.get('number'), 10);
        const eachPrice = parseInt(state.get('eachPrice'), 10);
        return state.set('number', number + 1)
                    .set('totalPrice', eachPrice * (number + 1));
    },
    [PRESS_DOWN_BUTTON]: (state, action) => {
        const number = parseInt(state.get('number'), 10);
        const eachPrice = parseInt(state.get('eachPrice'), 10);
        if(number === 1) {
            return state.set('number', 1);
        }
        return state.set('number', number - 1)
                    .set('totalPrice', eachPrice * (number - 1));
    }
}, initialState);