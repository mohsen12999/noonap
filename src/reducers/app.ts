export enum AppPages {
  MAIN = "main",
  ABOUT = "about",
  MARKET = "market",
  PRODUCT = "product",
  ADDRESS = "address",
  BILL = "bill",
  CHECKOUT = "checkout",
  COMEBACK = "comeback",
  SOON = "soon"
}

export interface IAppState {
  tabId?: number;
  pageId: number;
  pageName: AppPages;
  pageTitle: string;
  args?: string[];
  offline: boolean;
}

export const INITIAL_APPSTATE: IAppState = {
  tabId: 10,
  pageId: 0,
  pageName: AppPages.MAIN,
  pageTitle: "صفحه اصلی",
  offline: false
};
