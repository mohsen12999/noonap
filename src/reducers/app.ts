export enum AppPages {
  MAIN = "main",
  ABOUT = "about",
  PRODUCT = "product",
  ADDRESS = "address",
  BILL = "bill",
  CHECKOUT = "checkout",
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
  tabId: 0,
  pageId: 0,
  pageName: AppPages.MAIN,
  pageTitle: "صفحه اصلی",
  offline: false
};
