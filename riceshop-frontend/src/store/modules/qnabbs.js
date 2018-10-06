import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.qnabbs';
import { pender } from 'redux-pender';

// action types
const INITIALIZE = 'qnabbs/INITIALIZE';
const WRITE_QNA = 'qnabbs/WRITE_QNA';
const CHANGE_INPUT = 'qnabbs/CHANGE_INPUT';
const GET_QNA_LIST = 'qnabbs/GET_QNA_LIST';
const GET_QNA_BY_ID = 'qnabbs/GET_QNA_BY_ID';
const WRITE_ANSWER = 'qnabbs/WRITE_ANSWER';
const GET_QNA_LIST_WITH_ANSWERS = 'qnabbs/GET_QNA_LIST_WITH_ANSWERS';
const REMOVE_QNA_BBS = 'qnabbs/REMOVE_QNA_BBS';
const UPDATE_QNA_BBS = 'qnabbs/UPDATE_QNA_BBS';
const UPDATE_ANSWER = 'qnabbs/UPDATE_ANSWER';
const REMOVE_ANSWER = 'qnabbs/REMOVE_ANSWER';
const SEARCH = 'qnabbs/SEARCH';
const SHOW_PASSWORD_MODAL = 'qnabbs/SHOW_PASSWORD_MODAL';
const HIDE_PASSWORD_MODAL = 'qnabbs/HIDE_PASSWORD_MODAL';
const SHOW_PASSWORD_MODAL_IN_TABLE = 'qnabbs/SHOW_PASSWORD_MODAL_IN_TABLE';
const HIDE_PASSWORD_MODAL_IN_TABLE = 'qnabbs/HIDE_PASSWORD_MODAL_IN_TABLE';
const CHECK_PASSWORD = 'qnabbs/CHECK_PASSWORD';
const SET_QNA_ID = 'qnabbs/SET_QNA_ID';
const CHECK_QNA_AUTH = 'qnabbs/CHECK_QNA_AUTH';
const ON_CHANGE_SELECT = 'qnabbs/ON_CHANGE_SELECT';
const AUTHORIZE_BBS = 'qnabbs/AUTHORIZE_BBS';

// action creator
export const initialize = createAction(INITIALIZE);
export const writeQna = createAction(WRITE_QNA, api.writeQna);
export const changeInput = createAction(CHANGE_INPUT);
export const getQnaList = createAction(GET_QNA_LIST, api.getQnaList);
export const getQnaById = createAction(GET_QNA_BY_ID, api.getQnaById);
export const writeAnswer = createAction(WRITE_ANSWER, api.writeAnswer);
export const getQnaListWithAnswers = createAction(GET_QNA_LIST_WITH_ANSWERS, api.getQnaListWithAnswers);
export const removeQnaBbs = createAction(REMOVE_QNA_BBS, api.removeQnaBbs);
export const updateQnaBbs = createAction(UPDATE_QNA_BBS, api.updateQnaBbs);
export const updateAnswer = createAction(UPDATE_ANSWER, api.updateAnswer);
export const removeAnswer = createAction(REMOVE_ANSWER, api.removeAnswer);
export const search = createAction(SEARCH, api.search);
export const showPasswordModal = createAction(SHOW_PASSWORD_MODAL);
export const hidePasswordModal = createAction(HIDE_PASSWORD_MODAL);
export const showPasswordModalInTable = createAction(SHOW_PASSWORD_MODAL_IN_TABLE);
export const hidePasswordModalInTable = createAction(HIDE_PASSWORD_MODAL_IN_TABLE);
export const checkPassword = createAction(CHECK_PASSWORD, api.checkPassword);
export const setQnaId = createAction(SET_QNA_ID);
export const checkQnaAuth = createAction(CHECK_QNA_AUTH, api.checkQnaAuth);
export const onChangeSelect = createAction(ON_CHANGE_SELECT);
export const authorizeBbs = createAction(AUTHORIZE_BBS);

// initial state
const initialState = Map({
    qna: Map({}),
    title: '',
    content: '',
    username: '',
    qnaList: List(),
    lastPage: null,
    answer: Map({}),
    isSearched: false,
    searchedList: List(),
    searchword: '',
    qnabbspassword: '',
    passwordModalVisible: false,
    passwordModalInTableVisible: false,
    authorized: false,
    selecedQnaId: null,
    errorMessage: '',
    errored: false,
    canAccess: false,
    searchFilter: 'title'
});

// reducer
export default handleActions({
    ...pender({
        type: WRITE_QNA,
        onSuccess: (state, action) => {
            const { data: qna } = action.payload;
            return state.set('qna', qna);
        }
    }),
    ...pender({
        type: WRITE_ANSWER,
        onSuccess: (state, action) => {
            const { data: answer } = action.payload;
            return state.set('answer', answer);
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: GET_QNA_LIST,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            const lastPage = action.payload.headers['last-page'];
            return state.set('qnaList', fromJS(list))
                        .set('lastPage', lastPage);
        }
    }),
    ...pender({
        type: GET_QNA_LIST_WITH_ANSWERS,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            const lastPage = action.payload.headers['last-page'];
            return state.set('qnaList', fromJS(list))
                        .set('lastPage', lastPage);
        }
    }),
    ...pender({
        type: GET_QNA_BY_ID,
        onSuccess: (state, action) => {
            const { data: qna } = action.payload;
            return state.set('qna', qna)
                        .set('title', qna.title)
                        .set('content', qna.content);
        }
    }),
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: UPDATE_QNA_BBS,
        onSuccess: (state, action) => {
            const { data: qna } = action.payload;
            return state.set('qna', qna);
        }
    }),
    ...pender({
        type: UPDATE_ANSWER,
        onSuccess: (state, action) => {
            const { data: qna } = action.payload;
            return state.set('qna', qna);
        }
    }),
    ...pender({
        type: SEARCH,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            return state.set('isSearched', true)
                        .set('searchedList', fromJS(list));
        }
    }),
    [SHOW_PASSWORD_MODAL]: (state, action) => {
        return state.set('passwordModalVisible', true);
    },
    [HIDE_PASSWORD_MODAL]: (state, action) => {
        return state.set('passwordModalVisible', false);
    },
    [SHOW_PASSWORD_MODAL_IN_TABLE]: (state, action) => {
        return state.set('passwordModalInTableVisible', true);
    },
    [HIDE_PASSWORD_MODAL_IN_TABLE]: (state, action) => {
        return state.set('passwordModalInTableVisible', false)
                    .set('errorMessage', '')
                    .set('errored', false)
                    .set('selecedQnaId', null)
                    .set('qnabbspassword', '');
    },
    ...pender({
        type: CHECK_PASSWORD,
        onSuccess: (state, action) => {
            return state.set('authorized', true);
        },
        onError: (state, action) => {
            console.log("error");
            return state.set('authorized', false)
                        .set('errored', true)
                        .set('errorMessage', '비밀번호가 일치하지 않습니다');
        }
    }),
    [SET_QNA_ID]: (state, action) => {
        const { qnaId } = action.payload;
        return state.set('selecedQnaId', qnaId);
    },
    ...pender({
        type: CHECK_QNA_AUTH,
        onSuccess: (state, action) => {
            return state.set('canAccess', true);
        },
        onError: (state, action) => {
            return state.set('canAccess', false);
        }
    }),
    [ON_CHANGE_SELECT]: (state, action) => {
        const { filter } = action.payload;
        return state.set('searchFilter', filter);
    },
    [AUTHORIZE_BBS]: (state, action) => {
        return state.set('canAccess', true);
    }
}, initialState);