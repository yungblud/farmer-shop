import {createAction, handleActions} from 'redux-actions';

import {Map, List, fromJS} from 'immutable';
import * as api from 'lib/api.checkout';
import {pender} from 'redux-pender';

// action types
const GET_CHECKOUT_LIST = 'checkout/GET_CHECKOUT_LIST';
const GET_CHECKOUT_BY_ID = 'checkout/GET_CHECKOUT_BY_ID';
const GET_UNCHECKED_LIST = 'checkout/GET_UNCHECKED_LIST';
const HANDLE_SELECT = 'checkout/HANDLE_SELECT';
const SEARCH = 'checkout/SEARCH';
const CHANGE_INPUT = 'checkout/CHANGE_INPUT';
const SET_CHECKED = 'checkout/SET_CHECKED';
const GET_USER_CHECKOUT_LIST = 'checkout/GET_USER_CHECKOUT_LIST';
const GET_USER_CHECKOUT_BY_ID = 'checkout/GET_USER_CHECKOUT_BY_ID';
const GET_PARCEL_CRAWLED_DATA = 'checkout/GET_PARCEL_CRAWLED_DATA';
const SET_CANCEL = 'checkout/SET_CANCEL';
const SET_PAYBACK = 'checkout/SET_PAYBACK';
const HANDLE_TOP_FILTER_SELECT = 'checkout/HANDLE_TOP_FILTER_SELECT';
const SET_COMPLETE = 'checkout/SET_COMPLETE';
const UPDATE_SONGJANG_NUMBER = 'checkout/UPDATE_SONGJANG_NUMBER';
const UPDATE_SONGJANG_NUMBER_CANCEL = 'checkout/UPDATE_SONGJANG_NUMBER_CANCEL';
const CANCEL_CHECK = 'checkout/CANCEL_CHECK';
const GET_CHECKOUT_LIST_BY_FILTER = 'checkout/GET_CHECKOUT_LIST_BY_FILTER';
const HANDLE_FILTER_SELECT = 'checkout/HANDLE_FILTER_SELECT';
const UPDATE_SONGJANG_NUMBER_WITH_API = 'checkout/UPDATE_SONGJANG_NUMBER_WITH_API';

// action creator
export const getCheckoutList = createAction(GET_CHECKOUT_LIST, api.getCheckoutList);
export const getCheckoutById = createAction(GET_CHECKOUT_BY_ID, api.getCheckoutById);
export const getUncheckedList = createAction(GET_UNCHECKED_LIST, api.getUncheckedList);
export const handleSelect = createAction(HANDLE_SELECT);
export const search = createAction(SEARCH, api.search);
export const changeInput = createAction(CHANGE_INPUT);
export const setChecked = createAction(SET_CHECKED, api.setChecked);
export const getUserCheckoutList = createAction(GET_USER_CHECKOUT_LIST, api.getUserCheckoutList);
export const getUserCheckoutById = createAction(GET_USER_CHECKOUT_BY_ID, api.getUserCheckoutById);
export const getParcelCrawledData = createAction(GET_PARCEL_CRAWLED_DATA, api.getParcelCrawledData);
export const setCancel = createAction(SET_CANCEL, api.setCancel);
export const setPayback = createAction(SET_PAYBACK, api.setPayback);
export const handleTopFilterSelect = createAction(HANDLE_TOP_FILTER_SELECT);
export const setComplete = createAction(SET_COMPLETE, api.setComplete);
export const updateSongjangNumber = createAction(UPDATE_SONGJANG_NUMBER);
export const updateSongjangNumberCancel = createAction(UPDATE_SONGJANG_NUMBER_CANCEL);
export const cancelCheck = createAction(CANCEL_CHECK, api.cancelCheck);
export const getCheckoutListByFilter = createAction(GET_CHECKOUT_LIST_BY_FILTER, api.getUserCheckoutListByFilter);
export const handleFilterSelect = createAction(HANDLE_FILTER_SELECT);
export const updateSongjangNumberWithApi = createAction(UPDATE_SONGJANG_NUMBER_WITH_API, api.updateSongjangNumberWithApi);

// initial state
const initialState = Map({
    list: List(),
    checkout: Map({}),
    uncheckedList: List(),
    selectedValue: 'username',
    search: '',
    searchedList: List(),
    userCheckoutList: List(),
    userCheckoutDetail: Map({}),
    songjang: '',
    parcel: List(),
    topFilterValue: 'all',
    isUpdateSongjangMode: false,
    isFiltered: false,
    filteredUserCheckoutList: List()
});

// reducer
export default handleActions({
    ...pender({
        type: GET_CHECKOUT_LIST,
        onSuccess: (state, action) => {
            const {data: list} = action.payload;
            return state.set('list', fromJS(list));
        }
    }),
    ...pender({
        type: GET_CHECKOUT_BY_ID,
        onSuccess: (state, action) => {
            const {data: checkout} = action.payload;
            return state.set('checkout', checkout);
        }
    }),
    ...pender({
        type: GET_UNCHECKED_LIST,
        onSuccess: (state, action) => {
            const {data: list} = action.payload;
            return state.set('uncheckedList', fromJS(list));
        }
    }),
    [HANDLE_SELECT]: (state, action) => {
        const {value} = action.payload;
        return state.set('selectedValue', value);
    },
    ...pender({
        type: SEARCH,
        onSuccess: (state, action) => {
            const {data: list} = action.payload;
            return state
                .set('searchedList', fromJS(list))
                .set('list', fromJS(list));
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const {name, value} = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: GET_USER_CHECKOUT_LIST,
        onSuccess: (state, action) => {
            const {data: list} = action.payload;
            return state.set('userCheckoutList', fromJS(list));
        }
    }),
    ...pender({
        type: GET_USER_CHECKOUT_BY_ID,
        onSuccess: (state, action) => {
            const {data: detail} = action.payload;
            return state.set('userCheckoutDetail', detail);
        }
    }),
    ...pender({
        type: GET_PARCEL_CRAWLED_DATA,
        onSuccess: (state, action) => {
            const {data: parcel} = action.payload;
            return state.set('parcel', fromJS(parcel));
        }
    }),
    [HANDLE_TOP_FILTER_SELECT]: (state, action) => {
        const {value} = action.payload;
        return state.set('topFilterValue', value);
    },
    [UPDATE_SONGJANG_NUMBER]: (state, action) => {
        return state.set('isUpdateSongjangMode', true);
    },
    [UPDATE_SONGJANG_NUMBER_CANCEL]: (state, action) => {
        return state.set('isUpdateSongjangMode', false);
    },
    ...pender({
        type: GET_CHECKOUT_LIST_BY_FILTER,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('isFiltered', true)
                        .set('filteredUserCheckoutList', fromJS(list));
        }
    })
}, initialState);