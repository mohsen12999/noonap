export interface IMarketGroup {
  id: number;
  title: string;
  persianTitle: string;
  persianSubtitle?: string;
  img: string;
  enable: boolean;
  // "products": IProduct[];
}

export interface IMarket {
  id: number;
  title: string;
  persianTitle: string;
  persianSubtitle?: string;
  img: string;

  discount?: number;
  freeDeliver?: boolean;
  enable: boolean;

  marketGroupId: number;

  products: IProduct[];
  openTime: IOpenTimesState;

  address?: string;
  description?: string;
}

export interface IProduct {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  discount?: number;
  img: string;
  enable: boolean;
  max?: number;
  count: number;

  MarketId?: number;
}

export interface IWorkTime {
  title?: string;
  start: number;
  end: number;
}

export interface IOpenTime {
  day?: string;
  firstTime: IWorkTime;
  secoundTime?: IWorkTime;
}

interface IOpenTimesState {
  [date: string]: IOpenTime;
}

export interface IDeliverTime {
  id: number;
  title: string;
  start: number;
  end: number;
}

// -------------------------------------------------------------------------------------

// database

export interface IDbCustomer {
  id: number;
  mobile: string;
  name: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;

  created_at: any;
  updated_at: any;
}

export interface IDbGroup {
  id: number;
  title: string;
  persianTitle: string;
  persianSubtitle?: string;
  img: string;
  enabled: boolean;

  MarketId: number;

  created_at: any;
  updated_at: any;
}

export interface IDbMarket {
  id: number;
  title: string;
  persianTitle: string;
  persianSubtitle?: string;
  img: string;
  discount?: number;

  address?: string;
  description?: string;

  freeDeliver: boolean;
  enabled: boolean;

  express_send: boolean;
  future_send: boolean;
  takeout: boolean;
  reserve: boolean;
  future_takeout: boolean;

  groups_id: number;

  created_at: any;
  updated_at: any;
}

export interface IDbMarketPlus extends IDbMarket {
  isOpen: boolean;
}

export interface IDbOpenTime {
  id: number;
  dayName?: string;

  dayNumber: number;
  startTime: number;
  endTime: number;

  markets_id: number;

  created_at: any;
  updated_at: any;
}

export interface IDbProduct {
  id: number;
  title: string;
  persianTitle: string;
  persianSubTitle?: string;
  price: number;
  discount?: number;
  img: string;
  enable: boolean;
  max?: number;

  markets_id: number;

  created_at: any;
  updated_at: any;
  // count?: number;
}

export interface IDbProductPlus extends IDbProduct {
  count?: number;
}

export interface IDbInfo {
  groups: IDbGroup[];
  markets: IDbMarket[];
  openTimes: IDbOpenTime[];
  products: IDbProduct[];
}

export const MakeMarketPlus: (
  markets: IDbMarket[],
  opentimes: IDbOpenTime[]
) => IDbMarketPlus[] = (
  markets: IDbMarket[],
  opentimes: IDbOpenTime[]
): IDbMarketPlus[] => {
  const date: Date = new Date();
  const dayofweek: number = date.getDay();
  const hour: number = date.getHours() + date.getMinutes() / 100;

  return markets.map(m => {
    const mp: IDbMarketPlus = m as IDbMarketPlus;
    const ot: IDbOpenTime[] = opentimes.filter(
      (t: IDbOpenTime) =>
        Number(t.markets_id) === Number(m.id) &&
        Number(t.dayNumber) === dayofweek &&
        Number(t.startTime) <= hour &&
        hour <= t.endTime
    );
    const isOpen: boolean = ot !== undefined && ot.length > 0;
    return { ...mp, isOpen: isOpen };
  });
};

// mock values -> read from server at last
// market groups
// export const MarketsGroups: IMarketGroup[] = [
//   {
//     id: 1,
//     title: "Breads",
//     persianTitle: "نان تازه",
//     persianSubtitle: "خرید نان تازه و گرم",
//     img: "/images/group/bread.png",
//     enable: true
//   },
//   {
//     id: 2,
//     title: "Market",
//     persianTitle: "سوپر مارکت",
//     persianSubtitle: "انتخاب و خرید مواد غذایی",
//     img: "/images/group/shopping-cart.png",
//     enable: false
//   },
//   {
//     id: 3,
//     title: "FastFoods",
//     persianTitle: "فست فود",
//     persianSubtitle: "سفارش غذا از فست فود و کافه",
//     img: "/images/group/fast-food.png",
//     enable: false
//   },
//   {
//     id: 4,
//     title: "Restaurants",
//     persianTitle: "رستوران",
//     persianSubtitle: "سفارش غذاهای ایرانی و محلی",
//     img: "/images/group/resturant.png",
//     enable: false
//   },
//   {
//     id: 5,
//     title: "Souvenir",
//     persianTitle: "سوغات",
//     persianSubtitle: "صنایع دستی محلی و بومی",
//     img: "/images/group/souvenir.png",
//     enable: false
//   },
//   {
//     id: 6,
//     title: "Discount",
//     persianTitle: "تخفیفان رامسر",
//     persianSubtitle: "تخفیف های باورنکردنی از همه چیز",
//     img: "/images/group/discount.png",
//     enable: false
//   }
// ];

export const Markets: IMarket[] = [
  {
    id: 1,
    title: "Ebrahimi",
    persianTitle: "نانوایی ابراهیمی",
    persianSubtitle: "ابریشم محله",
    img: "/images/market/bakery-logo.png",
    enable: true,
    discount: 10,
    freeDeliver: true,
    marketGroupId: 1,
    products: [
      {
        id: 1,
        title: "بربری آزاد ساده",
        price: 1500,
        max: 30,
        img: "/images/product/barbari-192.png",
        enable: true,
        MarketId: 1,
        count: 0
      },
      {
        id: 2,
        title: "بربری آزاد کنجدی",
        price: 2000,
        max: 30,
        img: "/images/product/barbari-konjedi-192.png",
        enable: false,
        MarketId: 1,
        count: 0
      }
    ],
    openTime: {
      "6": {
        day: "شنبه",
        firstTime: {
          title: "6 تا 11",
          start: 6,
          end: 11
        }
      }
    },

    address: "رامسر - ابریشم محله",
    description: ""
  },
  {
    id: 2,
    title: "hayat",
    persianTitle: "نگارخانه حیاط حیات",
    img: "/images/market/florist-bakery-cafe.png",
    enable: true,
    discount: 0,
    marketGroupId: 1,
    products: [
      {
        id: 1,
        title: "دیتاکس کیوی",
        price: 15000,
        max: 5,
        img: "/images/product/water-kiwi.png",
        enable: true,
        MarketId: 1,
        count: 0
      },
      {
        id: 2,
        title: "دیتاکس خیار",
        price: 20000,
        max: 5,
        img: "/images/product/StrawberryCucumber.png",
        enable: false,
        MarketId: 1,
        count: 0
      },
      {
        id: 3,
        title: "دیتاکس لیمو",
        price: 20000,
        max: 5,
        img: "/images/product/lemon.png",
        enable: false,
        MarketId: 1,
        count: 0
      },
      {
        id: 4,
        title: "دیتاکس مخصوص",
        price: 20000,
        max: 5,
        img: "/images/product/detox-water-.png",
        enable: false,
        MarketId: 1,
        count: 0
      }
    ],
    openTime: {
      "6": {
        day: "شنبه",
        firstTime: {
          title: "6 تا 11",
          start: 6,
          end: 11
        }
      }
    },
    address: "رامسر - ابریشم محله",
    description: ""
  }
];

export const PRODUCT_LIST: IProduct[] = [
  // - Breads
  {
    id: 1,
    title: "بربری آزاد ساده",
    price: 1500,
    max: 30,
    img: "/images/noon/barbari-192.png",
    enable: true,
    MarketId: 1,
    count: 0
  },
  {
    id: 2,
    title: "بربری آزاد کنجدی",
    price: 2000,
    max: 30,
    img: "/images/noon/barbari-konjedi-192.png",
    enable: false,
    MarketId: 1,
    count: 0
  },
  {
    id: 3,
    title: "سنگک آزاد ساده",
    price: 1500,
    max: 30,
    img: "/images/noon/sangak-192.png",
    enable: false,
    MarketId: 1,
    count: 0
  },
  {
    id: 4,
    title: "سنگک آزاد کنجدی",
    price: 2000,
    max: 30,
    img: "/images/noon/sangak-konjedi-192.png",
    enable: false,
    MarketId: 1,
    count: 0
  },
  {
    id: 5,
    title: "لواش",
    price: 250,
    max: 100,
    img: "/images/noon/lavash-192.png",
    enable: false,
    MarketId: 1,
    count: 0
  }
];

export const TIME_LIST: IDeliverTime[] = [
  { id: 1, title: "6:00 تا 7:00 صبح", start: 6, end: 7 },
  { id: 2, title: "7:00 تا 8:00 صبح", start: 7, end: 8 },
  { id: 3, title: "8:00 تا 10:00 صبح", start: 8, end: 10 },
  { id: 4, title: "17:00 تا 19:00 عصر", start: 17, end: 19 },
  { id: 5, title: "19:00 تا 22:00 شب", start: 19, end: 22 }
];

// - Todo: 3 title
