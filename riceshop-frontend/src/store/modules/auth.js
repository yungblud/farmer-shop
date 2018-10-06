import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api.member';

// action types
const INITIALIZE = 'auth/INITIALIZE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const RESET_ERROR_MESSAGE = 'auth/RESET_ERROR_MESSAGE';
const SET_ERROR_MESSAGE = 'auth/SET_ERROR_MESSAGE';
const SET_LOGGED_INFO = 'auth/SET_LOGGED_INFO';
const SETTING_CHECK = 'auth/SETTING_CHECK';
const CHANGE_USER_INFO = 'auth/CHANGE_USER_INFO';
const CHANGE_INPUT_SETTING = 'auth/CHANGE_INPUT_SETTING';
const SET_ERROR_MESSAGE_WITH_CODE = 'auth/SET_ERROR_MESSAGE_WITH_CODE';
const INITIALIZE_MODAL = 'base/INITIALIZE_MODAL';

// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const register = createAction(REGISTER, api.register);
export const login = createAction(LOGIN, api.login);
export const resetErrorMessage = createAction(RESET_ERROR_MESSAGE);
export const setErrorMessage = createAction(SET_ERROR_MESSAGE);
export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const settingCheck = createAction(SETTING_CHECK, api.settingCheck);
export const changeUserInfo = createAction(CHANGE_USER_INFO, api.changeUserInfo);
export const changeInputSetting = createAction(CHANGE_INPUT_SETTING);
export const setErrorMessageWithCode = createAction(SET_ERROR_MESSAGE_WITH_CODE);
export const initializeModal = createAction(INITIALIZE_MODAL);


// initial state
const initialState = Map({
    input: Map({
        userID: '',
        userPassword: '',
        userPasswordConfirm: '',
        userEmail: '',
        userName: '',
        userPhonePost: '',
        userPhoneCenter: '',
        userPhoneRear: '',
        userAddress: '',
        userPostCode: '',
        userDetailAddress: ''
    }),
    memberLogged: false,
    errorCode: '',
    errorMessage: '',
    registerSuccess: false,
    userID: '',
    errorFlashVisible: false,
    memberLoggedResult: Map({}),
    loggedInfo: Map({}),
    settingInfo: Map({}),
    setting: Map({
        email: '',
        password: '',
        passwordCheck: '',
        settingSuccess: false
    })
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    },
    [CHANGE_INPUT_SETTING]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['setting', name], value);
    },
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            localStorage.userID = result.userID;
            return state.set('userID', result.userID)
                        .set('memberLoggedResult', result);
        },
        onError: (state, action) => {
            return state.set('memberLogged', false)
                        .set('errorMessage', '아이디 혹은 비밀번호가 일치하지 않습니다.')
                        .set('errorFlashVisible', true);
        }
    }),
    [RESET_ERROR_MESSAGE]: (state, action) => {
        return state.set('errorMessage', '')
                    .set('errorCode', '');
    },
    ...pender({
        type: REGISTER, 
        onSuccess: (state, action) => {
            return state.set('registerSuccess', true);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.set('errorMessage', errorLog)
                        .set('errorCode', errorCode)
                        .set('errorFlashVisible', true);
        }
    }),
    [SET_ERROR_MESSAGE]: (state, action) => {
        const { errorMessage } = action.payload;
        return state.set('errorFlashVisible', true)
                    .set('errorMessage', errorMessage);
    },
    [SET_LOGGED_INFO]: (state, action) => {
        return state.set('loggedInfo', Map(action.payload))
                    .set('memberLogged', true);
    },
    ...pender({
        type: SETTING_CHECK,
        onSuccess: (state, action) => {
            const { data: info } = action.payload;
            return state.set('settingInfo', info);
        }
    }),
    ...pender({
        type: CHANGE_USER_INFO,
        onSuccess: (state, action) => {
            const { data: userInfo } = action.payload;
            return state.set('settingSuccess', true)
                        .set('settingInfo', userInfo);
        },
        onError: (state, action) => {
            const { errorCode, errorLog } = action.payload.response.data;
            return state.set('errorCode', errorCode)
                        .set('errorLog', errorLog);
        }
    }),
    [SET_ERROR_MESSAGE_WITH_CODE]: (state, action) => {
        const { errorCode, errorLog } = action.payload;
        return state.set('errorCode', errorCode)
                    .set('errorLog', errorLog);
    },
    [INITIALIZE_MODAL]: (state, action) => {
        return state.setIn(['setting', 'email'], '')
                    .setIn(['setting', 'password'], '')
                    .setIn(['setting', 'passwordCheck'], '')
                    .setIn(['setting', 'settingSuccess'], false);
    }
}, initialState);