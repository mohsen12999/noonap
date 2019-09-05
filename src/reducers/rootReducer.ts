import { combineReducers } from "redux";
import AppReducer from "./appReducer";
import ShopReducer from "./shopReducer";

export default combineReducers({
  // mainReducer
  app: AppReducer,
  shop: ShopReducer,
});
