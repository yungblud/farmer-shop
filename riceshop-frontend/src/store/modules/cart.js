import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import * as api from "lib/api.cart";
import { pender } from "redux-pender";

// action types
const ADD_CART = "cart/ADD_CART";
const INITIALIZE = "cart/INITIALIZE";
const GET_CART_LIST = "cart/GET_CART_LIST";
const REMOVE_CART_BY_ID = "cart/REMOVE_CART_BY_ID";
const REMOVE_CART = "cart/REMOVE_CART";
const CHANGE_NUMBER = "cart/CHANGE_NUMBER";
const SET_SELECTED_CART = "cart/SET_SELECTED_CART";
const SET_NUMBER = "cart/SET_NUMBER";
const SET_SELECTED_THUMBNAIL = 'cart/SET_SELECTED_THUMBNAIL';

// action creator
export const addCart = createAction(ADD_CART, api.addCart);
export const initialize = createAction(INITIALIZE);
export const getCartList = createAction(GET_CART_LIST, api.getCartList);
export const removeCartById = createAction(
  REMOVE_CART_BY_ID,
  api.removeCartById
);
export const removeCart = createAction(REMOVE_CART, api.removeCart);
export const changeNumber = createAction(CHANGE_NUMBER);
export const setSelectedCart = createAction(SET_SELECTED_CART);
export const setNumber = createAction(SET_NUMBER);
export const setSelectedThumbnail = createAction(SET_SELECTED_THUMBNAIL);

// initial state
const initialState = Map({
  cartError: Map({
    errorCode: "",
    errorLog: ""
  }),
  cartLog: "",
  cartList: List(),
  totalPrice: 0,
  number: "",
  selectedCart: Map({}),
  selectedThumbnail: ''
});

// reducer
export default handleActions(
  {
    [CHANGE_NUMBER]: (state, action) => {
      const { value } = action.payload;
      if (value === "") {
        return state.set("number", "");
      }
      return state.set("number", parseInt(value, 10));
    },
    [SET_SELECTED_CART]: (state, action) => {
      const { cart } = action.payload;
      return state.set("selectedCart", fromJS(cart));
    },
    [SET_NUMBER]: (state, action) => {
      const { value } = action.payload;

      return state.set("number", parseInt(value, 10));
    },
    [SET_SELECTED_THUMBNAIL]: (state, action) => {
        const { thumbnail } = action.payload;
        return state.set('selectedThumbnail', thumbnail);  
    },
    ...pender({
      type: ADD_CART,
      onSuccess: (state, action) => {
        const { cartLog } = action.payload.data;
        return state.set("cartLog", cartLog);
      },
      onError: (state, action) => {
        const { errorCode, errorLog } = action.payload.data;
        return state
          .setIn(["cartError", "errorCode"], errorCode)
          .setIn(["cartError", "errorLog"], errorLog);
      }
    }),
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
      type: GET_CART_LIST,
      onSuccess: (state, action) => {
        const { data: cartList } = action.payload;
        if (cartList === "") {
          return state.set("cartList", []);
        }
        const totalPriceList = cartList.map((cart, i) => {
          let totalPrice = 0;
          totalPrice += parseInt(cart.totalPrice, 10);
          return totalPrice;
        });
        let totalPrice = 0;
        for (let price of totalPriceList) {
          totalPrice += parseInt(price, 10);
        }
        return state.set("cartList", cartList).set("totalPrice", totalPrice);
      }
    }),
    ...pender({
      type: REMOVE_CART_BY_ID,
      onSuccess: (state, action) => {
        // console.log(action.payload);
        const { data: cartList } = action.payload;
        const totalPriceList = cartList.map((cart, i) => {
          let totalPrice = 0;
          totalPrice += parseInt(cart.totalPrice, 10);
          return totalPrice;
        });
        let totalPrice = 0;
        for (let price of totalPriceList) {
          totalPrice += parseInt(price, 10);
        }
        return state.set("cartList", cartList).set("totalPrice", totalPrice);
      }
    })
  },
  initialState
);
