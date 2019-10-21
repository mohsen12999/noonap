import { ActionTypes } from "../actions/actionTypes";
import { Reducer } from "redux";
import {
  IShopState,
  INITIAL_SHOPSTATE,
  ICartState,
  IDeliverState
} from "./shop";

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
      return {
        ...state,
        lastMarketId: action.payload.marketId,
        // products: state.products,
        cart: cart(state.cart, action)
        // deliver: state.deliver,
        // error: state.error
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        // lastMarketId:MarketId(action),
        // products: state.products,
        cart: cart(state.cart, action)
        // deliver: state.deliver,
        // error: state.error
      };

    case ActionTypes.TRY_LOADING_INIT:
      return {
        ...state,
        loadingDbInfo: true
      };
    case ActionTypes.SUCCESS_LOAD_INIT:
    case ActionTypes.FAILED_LOAD_INIT:
      return {
        ...state,
        loadingDbInfo: false
      };

    case ActionTypes.CHANGE_DELIVERKIND:
    case ActionTypes.CHANGE_DELIVERDISTRICT:
    case ActionTypes.CHANGE_MOBILE:
    case ActionTypes.CHANGE_FULLNAME:
    case ActionTypes.CHANGE_ADDRESS:
    case ActionTypes.TRY_LOADING_USER_INFO:
    case ActionTypes.SUCCESS_LOAD_USER_INFO:
    case ActionTypes.FAILED_LOAD_USER_INFO:
    case ActionTypes.TRY_LOADING_LOCATION:
    case ActionTypes.SUCCESS_LOAD_LOCATION:
    case ActionTypes.FAILED_LOAD_LOCATION:
      return {
        ...state,
        // lastMarketId:MarketId(action),
        // products: state.products,
        // cart: cart(state.cart, action),
        deliver: deliver(state.deliver, action)
        // error: state.error
      };

    default:
      return state;
  }
};

const cart: any = (state: ICartState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const addId: string = action.payload.productId;
      // check max
      // const quant = (state[addId] || 0);
      // const prod = PRODUCT_LIST.find(x=>x.id === addId);
      // const max = prod!==undefined ? prod.max : undefined;
      // if(max !== undefined && quant>=max){
      //   return {
      //     ...state,
      //     [addId]: max
      //   };
      // }
      return {
        ...state,
        [addId]: (state[addId] || 0) + 1
      };

    case ActionTypes.REMOVE_FROM_CART:
      const removeId: string = action.payload.productId;
      const quantity: number = (state[removeId] || 0) - 1;
      if (quantity <= 0) {
        const newState: ICartState = { ...state };
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

const deliver: any = (
  state: IDeliverState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_DELIVERKIND:
      const deliverKind: string = action.payload.deliverKind;
      return {
        ...state,
        deliverKind: deliverKind
      };

    case ActionTypes.CHANGE_DELIVERDISTRICT:
      const deliverDistrict: string = action.payload.deliverDistrict;
      return {
        ...state,
        deliverDistrict: deliverDistrict
      };

    case ActionTypes.CHANGE_MOBILE:
      const mobile: string = action.payload.mobile;
      return {
        ...state,
        mobile: mobile
      };

    case ActionTypes.CHANGE_FULLNAME:
      const fullname: string = action.payload.fullname;
      return {
        ...state,
        fullname: fullname
      };

    case ActionTypes.CHANGE_ADDRESS:
      const address: string = action.payload.address;
      return {
        ...state,
        address: address
      };

    case ActionTypes.TRY_LOADING_USER_INFO:
      return {
        ...state,
        loadingInfo: true
      };
    case ActionTypes.SUCCESS_LOAD_USER_INFO:
      const fullname1: string = action.payload.fullname;
      const address1: string = action.payload.address;
      const district1: string = action.payload.district;
      return {
        ...state,
        fullname: fullname1,
        address: address1,
        deliverDistrict: district1,
        loadingInfo: false
      };
    case ActionTypes.FAILED_LOAD_USER_INFO:
      console.log(action.payload.error);
      return {
        ...state,
        loadingInfo: false
      };
    case ActionTypes.TRY_LOADING_LOCATION:
      return {
        ...state,
        loadinglocation: true
      };
    case ActionTypes.SUCCESS_LOAD_LOCATION:
      const address2: string = action.payload.address;
      const location: Position = action.payload.location;
      return {
        ...state,
        address: address2,
        location: location,
        loadinglocation: false
      };
    case ActionTypes.FAILED_LOAD_LOCATION:
      console.log(action.payload.error);
      return {
        ...state,
        loadinglocation: false
      };
    default:
      return state;
  }
};

export default ShopReducer;
