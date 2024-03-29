import moment from "moment";
import { Moment } from "moment-jalaali";
import {
  IGroup,
  IMarketPlus,
  IOpenTime,
  IProduct,
  IOrder,
  IOrderDetail
} from "../actions/shop";

export interface IShopState {
  // ------------------------------
  // dbInfo?: IDbInfo;
  groups: IGroup[];
  markets: IMarketPlus[];
  openTimes: IOpenTime[];
  products: IProduct[];

  // ------------------------------
  // products: IProductsState;
  cart: ICartState;
  deliver: IDeliverState;
  error: string;

  lastMarketId?: number;
  loadingDbInfo: boolean;
  loadDbInfo: boolean;

  // ------------------------------
  loadOrder: boolean;
  order?: IOrder;
  orderDetails: IOrderDetail[];
  transId?: string;
  payurl?: string;
}

export interface IProductsState {
  [index: string]: IProductState;
}

export interface IProductState {
  id: number;
  title: string;
  price: number;
  max: number;
  img: string;
  enable: boolean;
}

export interface ICartState {
  [index: string]: number;
}

export interface ICartItem {
  id: number;
  title: string;
  amount: number;
  price: number;
}

export interface IDeliverState {
  deliverKind: string;
  deliverDistrict: string;

  mobile: string;
  fullname: string;
  address: string;

  location?: Position;
  date: Moment;
  // time: string;

  loadingInfo: boolean;
  loadingLocation: boolean;
  // sendingCart:boolean;
}

export const INITIAL_SHOPSTATE: IShopState = {
  // dbInfo: undefined,
  // products: {},
  groups: [],
  markets: [],
  openTimes: [],
  products: [],

  cart: {},
  deliver: {
    deliverKind: "",
    deliverDistrict: "",
    fullname: "",
    address: "",
    mobile: "",
    date: moment(),
    // time: "",
    loadingInfo: false,
    loadingLocation: false
    // , sendingCart:false
  },
  error: "",

  lastMarketId: undefined,
  loadingDbInfo: false,
  loadDbInfo: false,

  loadOrder: false,
  order: undefined,
  orderDetails: []
};

export enum deliverKindType {
  express_send = "express_send",
  future_send = "future_send",
  takeout = "takeout",
  reserve = "reserve",
  future_takeout = "future_takeout"
}

export const deliverKindPersian: (dk: deliverKindType) => string = (
  dk: deliverKindType
) => {
  switch (dk) {
    case deliverKindType.express_send:
      return "ارسال فوری";
    case deliverKindType.future_send:
      return "ارسال در آینده";
    case deliverKindType.takeout:
      return "دریافت حضوری";
    case deliverKindType.reserve:
      return "رزرو مکان";
    case deliverKindType.future_takeout:
      return "تحویل حضوری در آینده";
    default:
      return "";
  }
};

export const deliverKindPersianst: (st: string) => string = (st: string) => {
  if (st === "") {
    return "";
  }
  return deliverKindPersian(st as deliverKindType);
};
