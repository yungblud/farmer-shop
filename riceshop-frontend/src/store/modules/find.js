import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as FindAPI from 'lib/api.find';
import { pender } from 'redux-pender';

// action types
const INITIALIZE = 'find/INITIALIZE';
const CHANGE_INPUT = 'find/CHANGE_INPUT';
const FIND_USERID = 'find/FIND_USERID';
const FIND_PASSWORD = 'find/FIND_PASSWORD';

// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const findUserId = createAction(FIND_USERID, FindAPI.findUserId);
export const findPassword = createAction(FIND_PASSWORD, FindAPI.findPassword);

// initial state
const initialState = Map({
    input: Map({
        userId: '',
        username: '',
        userEmail1: '',
        userEmail2: ''
    }),
    error: Map({
        error: false,
        message: ''
    }),
    success: false
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    },
    ...pender({
        type: FIND_USERID,
        onSuccess: (state, action) => {
            return state.set('success', true);
        },
        onFailure: (state, action) => {
            // console.log(action.payload.response.status);
            const { status } = action.payload.response;
            if(status === 500) {
                return state.setIn(['error', 'error'], true)
                            .setIn(['error', 'message'], '부정확한 아이디 혹은 이메일입니다.');
            }
        }
    }),
    ...pender({
        type: FIND_PASSWORD,
        onSuccess: (state, action) => {
            return state.set('success', true);
        },
        onFailure: (state, action) => {
            const { status } = action.payload.response;
            if(status === 404) {
                return state.setIn(['error', 'error'], true)
                            .setIn(['error', 'message'], '없는 계정입니다.');
            }
            if(status === 500) {
                return state.setIn(['error', 'error'], true)
                .setIn(['error', 'message'], '부정확한 아이디 혹은 이메일입니다.');
            }
        }
    })
}, initialState);