export enum AppPages {
  MAIN_PAGE = "mainPage",
  ABOUT_PAGE = "aboutPage",
  PRODUCT_PAGE = "productPage",
  ADDRESS_PAGE = "addressPage",
  BILL_PAGE = "billPage",
  CHECKOUT_PAGE = "checkoutPage"
}

export interface IAppState {
  pageId: number;
  pageName: AppPages;
  pageTitle: string;
  args?: string[];
  offline: boolean;
}

export const INITIAL_APPSTATE: IAppState = {
  pageId: 0,
  pageName: AppPages.MAIN_PAGE,
  pageTitle: "صفحه اصلی",
  offline: false
};
