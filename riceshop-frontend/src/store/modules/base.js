import {
    createAction,
    handleActions
} from 'redux-actions';

import {
    Map,
    List
} from 'immutable';
import * as api from 'lib/api.admin';
import * as memberApi from 'lib/api.member';
import {
    pender
} from 'redux-pender';

// action types
const SHOW_SIDEBAR = 'base/SHOW_SIDEBAR';
const HIDE_SIDEBAR = 'base/HIDE_SIDEBAR';
const ADMIN_CHECK = 'base/ADMIN_CHECK';
const ADMIN_TEMP_LOGIN = 'base/ADMIN_TEMP_LOGIN';
const ADMIN_LOGIN = 'base/ADMIN_LOGIN';
const ADMIN_LOGOUT = 'base/ADMIN_LOGOUT';
const MEMBER_CHECK = 'base/MEMBER_CHECK';
const MEMBER_TEMP_LOGIN = 'base/MEMBER_TEMP_LOGIN';
const MEMBER_LOGOUT = 'base/MEMBER_LOGOUT';
const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY';
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';


// action creator
export const showSidebar = createAction(SHOW_SIDEBAR);
export const hideSidebar = createAction(HIDE_SIDEBAR);
export const adminCheck = createAction(ADMIN_CHECK, api.adminCheck);
export const adminTempLogin = createAction(ADMIN_TEMP_LOGIN);
export const adminLogin = createAction(ADMIN_LOGIN, api.adminLogin);
export const adminLogout = createAction(ADMIN_LOGOUT, api.adminLogout);
export const memberCheck = createAction(MEMBER_CHECK, memberApi.check);
export const memberTempLogin = createAction(MEMBER_TEMP_LOGIN);
export const memberLogout = createAction(MEMBER_LOGOUT, memberApi.logout);
export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY); // visible
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);


// initial state
const initialState = Map({
    sideBar: Map({
        visible: false
    }),
    adminLogged: false,
    memberLogged: false,
    header: Map({
        visible: true
    }),
    userMenu: Map({
        visible: false
    }),
    errorVisible: false,
    errorMessage: '',
    modal: Map({
        passwordSetting: false,
        emailSetting: false,
        postRemove: false,
        category: false,
        cart: false
    })
});

// reducer
export default handleActions({
    [HIDE_SIDEBAR]: (state, action) => state.setIn(['sideBar', 'visible'], false),
    [SHOW_SIDEBAR]: (state, action) => state.setIn(['sideBar', 'visible'], true),
    [SET_HEADER_VISIBILITY]: (state, action) => {
        return state.setIn(['header', 'visible'], action.payload);
    },
    [SET_USER_MENU_VISIBILITY]: (state, action) => {
        return state.setIn(['userMenu', 'visible'], action.payload)
    },
    ...pender({
        type: ADMIN_CHECK,
        onSuccess: (state, action) => {
            const {
                data: isLogged
            } = action.payload;
            return state.set('adminLogged', isLogged);
        },
        onError: (state, action) => {
            return state.set('adminLogged', false);
        }
    }),
    [ADMIN_TEMP_LOGIN]: (state, action) => {
        return state.set('adminLogged', true);
    },
    ...pender({
        type: ADMIN_LOGIN,
        onSuccess: (state, action) => {
            const {
                data: isSuccess
            } = action.payload;
            return state.set('adminLogged', isSuccess);
        },
        onError: (state, action) => {
            return state.set('adminLogged', false)
                .set('errorVisible', true)
                .set('errorMessage', '아이디 혹은 비밀번호가 일치하지 않습니다.');
        }
    }),
    ...pender({
        type: ADMIN_LOGOUT,
        onSuccess: (state, action) => {
            localStorage.adminLogged = null;
            return state.set('adminLogged', false);
        }
    }),
    ...pender({
        type: MEMBER_CHECK,
        onSuccess: (state, action) => {
            const {
                data: isLogged
            } = action.payload;
            return state.set('memberLogged', isLogged);
        },
        onError: (state, action) => {
            return state.set('memberLogged', false);
        }
    }),
    [MEMBER_TEMP_LOGIN]: (state, action) => {
        return state.set('memberLogged', true);
    },
    ...pender({
        type: MEMBER_LOGOUT,
        onSuccess: (state, action) => {
            localStorage.memberLogged = null;
            return state.set('memberLogged', false);
        }
    }),
    [SHOW_MODAL]: (state, action) => {
        const {
            payload: modalName
        } = action;
        return state.setIn(['modal', modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
        const {
            payload: modalName
        } = action;
        return state.setIn(['modal', modalName], false);
    }
}, initialState);