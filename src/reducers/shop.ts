export interface IShopState {
  lastMarketId?:number;
  products: IProductsState;
  cart: ICartState;
  deliver: IDeliverState;
  error: string;
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
  fullName: string;
  mobile: string;
  address: string;
  location?: Position;
  time: string;
}

export const INITIAL_SHOPSTATE: IShopState = {
  products: {},
  cart: {},
  deliver: { fullName: "", address: "", mobile: "", time: "" },
  error: ""
};
