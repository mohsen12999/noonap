import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import AppReducer from "./appReducer";
import ShopReducer from "./shopReducer";

const createRootReducer = (history:any) => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  shop: ShopReducer,
})
export default createRootReducer
