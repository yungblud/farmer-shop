import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as api from 'lib/api.payment';
import { pender } from 'redux-pender';
import storage from 'lib/storage';
// action types
const CHANGE_INPUT = 'payment/CHANGE_INPUT';
const GET_ACCESS_TOKEN= 'payment/GET_ACCESS_TOKEN';
const GET_MERCHANT_UID= 'payment/GET_MERCHANT_UID';
const INITIALIZE = 'payment/INITIALIZE';
const GET_USER_INFO = 'payment/GET_USER_INFO';


// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const getAccessToken = createAction(GET_ACCESS_TOKEN, api.getAccessToken);
export const getMerchantUid = createAction(GET_MERCHANT_UID, api.getMerchantUid);
export const initialize = createAction(INITIALIZE);
export const getUserInfo = createAction(GET_USER_INFO, api.getUserInfo);

// initial state
const initialState = Map({
    userName: '',
    userPhonePost: '',
    userPhoneCenter: '',
    userPhoneRear: '',
    userAddress: '',
    userPostCode: '',
    userDetailAddress: '',
    userEmail: '',
    accessToken: '',
    iamportError: false,
    merchantUid: '',
    iamportAmount: 0,
    userInfo: Map({})
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: GET_ACCESS_TOKEN,
        onSuccess: (state, action) => {
            const { responseJSON } = action.payload.data;
            const code = JSON.parse(responseJSON).code;
            if(code !== 0) {
                return state.set('iamportError', true);
            }
            return state.set('accessToken', JSON.parse(responseJSON).response.access_token);

        }
    }),
    ...pender({
        type: GET_MERCHANT_UID,
        onSuccess: (state, action) => {
            const { responseJSON } = action.payload.data;
            const code = JSON.parse(responseJSON).code;
            if(code !== 0) {
                return state.set('iamportError', true);
            }
            return state.set('merchantUid', JSON.parse(responseJSON).response.merchant_uid)   
                        .set('iamportAmount', JSON.parse(responseJSON).response.amount);
        }
    }),
    [INITIALIZE]: (state, action) => {
        const { userName, userEmail } = storage.get('loggedInfo');
        return state.set('userName', userName)
                    .set('userEmail', userEmail);
    },
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state, action) => {
            const { data: info } = action.payload;
            return state.set('userName', info.userName)
                        .set('userPhonePost', info.userPhone.split("-")[0])
                        .set('userPhoneCenter', info.userPhone.split("-")[1])
                        .set('userPhoneRear', info.userPhone.split("-")[2])
                        .set('userAddress', info.userAddress)
                        .set('userPostCode', info.userPostCode)
                        .set('userDetailAddress', info.userDetailAddress)
                        .set('userEmail', info.userEmail);

        }
    })
}, initialState);