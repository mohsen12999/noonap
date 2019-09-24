import { ActionTypes } from "../actions/actionTypes";
import { Reducer } from "redux";
import { IShopState, INITIAL_SHOPSTATE, ICartState } from "./shop";

const ShopReducer: Reducer<IShopState, { type: any; payload: any }> = (
  state = INITIAL_SHOPSTATE,
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      const newPage: any = action.payload.newPage;
      return {
        ...state,
        pageName: newPage
      };

    case ActionTypes.ADD_TO_CART:
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products,
        cart: cart(state.cart, action),
        deliver: state.deliver,
        error: state.error
      };

    default:
      return state;
  }
};

const cart = (state: ICartState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const addId = action.payload.productId;
      return {
        ...state,
        [addId]: (state[addId] || 0) + 1
      };

    case ActionTypes.REMOVE_FROM_CART:
      const removeId = action.payload.productId;
      const quantity = (state[removeId] || 0) - 1;
      if (quantity <= 0) {
        const newState = { ...state };
        delete newState[removeId];
        return newState;
      } else {
        return {
          ...state,
          [removeId]: quantity
        };
      }

    // case CHECKOUT_SUCCESS:
    //   return {};
    default:
      return state;
  }
};

export default ShopReducer;
