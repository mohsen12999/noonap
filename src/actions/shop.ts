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
  enable: boolean;

  marketGroupId: number;

  products?: IProduct[];
  openTime?: IOpenTime[];

  address?: string;
  description?: string;
}

export interface IProduct {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  img: string;
  enable: boolean;
  max: number;
  count: number;
  MarketId?: number;
}

export interface IOpenTime {
  day: string;
  morning: string;
  morningStart: number;
  morningEnd: number;
  evening?: string;
  eveningStart?: number;
  eveningEnd?: number;
}

export interface IDeliverTime {
  id: number;
  title: string;
  start: number;
  end: number;
}

// mock values -> read from server at last
// market groups
export const MarketsGroups: IMarketGroup[] = [
  {
    id: 1,
    title: "Breads",
    persianTitle: "نان تازه",
    persianSubtitle: "خرید نان تازه و گرم",
    img: "/images/group/bread.png",
    enable: true
  },
  {
    id: 2,
    title: "Market",
    persianTitle: "سوپر مارکت",
    persianSubtitle: "انتخاب و خرید مواد غذایی",
    img: "/images/group/shopping-cart.png",
    enable: false
  },
  {
    id: 3,
    title: "FastFoods",
    persianTitle: "فست فود",
    persianSubtitle: "سفارش غذا از فست فود و کافه",
    img: "/images/group/fast-food.png",
    enable: false
  },
  {
    id: 4,
    title: "Restaurants",
    persianTitle: "رستوران",
    persianSubtitle: "سفارش غذاهای ایرانی و محلی",
    img: "/images/group/resturant.png",
    enable: false
  },
  {
    id: 5,
    title: "Souvenir",
    persianTitle: "سوغات",
    persianSubtitle: "صنایع دستی محلی و بومی",
    img: "/images/group/souvenir.png",
    enable: false
  },
  {
    id: 6,
    title: "Discount",
    persianTitle: "تخفیفان رامسر",
    persianSubtitle: "تخفیف های باورنکردنی از همه چیز",
    img: "/images/group/discount.png",
    enable: false
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
