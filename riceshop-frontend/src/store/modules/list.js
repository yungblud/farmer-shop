import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as api from 'lib/api.list';
import { pender } from 'redux-pender';

// action types
const GET_LIST_ITEM = 'list/GET_LIST_ITEM';
const GET_INITIAL_LIST = 'list/GET_INITIAL_LIST';

// action creator
export const getListItem = createAction(GET_LIST_ITEM, api.getListItem);
export const getInitialList = createAction(GET_INITIAL_LIST, api.getInitialList);

// initial state
const initialState = Map({
    itemList: List(),
    lastId: ''
});

// reducer
export default handleActions({
    ...pender({
        type: GET_LIST_ITEM,
        onSuccess: (state, action) => {
            const { data: list } = action.payload;
            const itemList = state.get('itemList');
            if(list.length === 0) {
                return state;
            }
            return state.set('itemList', itemList.concat(fromJS(list)))
                        .set('lastId', list[list.length - 1].id);
        }
    }),
    ...pender({
        type: GET_INITIAL_LIST,
        onSuccess: (state, action) => {
            const {data: list} = action.payload;
            
            return state.set('itemList', fromJS(list))
                        .set('lastId', list[list.length - 1].id);
        }
    })
}, initialState);