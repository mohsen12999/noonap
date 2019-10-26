export interface ICustomer {
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

export interface IGroup {
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

export interface IMarket {
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

export interface IMarketPlus extends IMarket {
  isOpen: boolean;
}

export interface IOpenTime {
  id: number;
  dayName?: string;

  dayNumber: number;
  startTime: number;
  endTime: number;

  markets_id: number;

  created_at: any;
  updated_at: any;
}

export interface IProduct {
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

export interface IProductPlus extends IProduct {
  count?: number;
}

export interface IDbInfo {
  groups: IGroup[];
  markets: IMarket[];
  openTimes: IOpenTime[];
  products: IProduct[];
}

export const MakeMarketPlus: (
  markets: IMarket[],
  opentimes: IOpenTime[]
) => IMarketPlus[] = (
  markets: IMarket[],
  opentimes: IOpenTime[]
): IMarketPlus[] => {
  const date: Date = new Date();
  const dayofweek: number = date.getDay();
  const hour: number = date.getHours() + date.getMinutes() / 100;

  return markets.map(m => {
    const mp: IMarketPlus = m as IMarketPlus;
    const ot: IOpenTime[] = opentimes.filter(
      (t: IOpenTime) =>
        Number(t.markets_id) === Number(m.id) &&
        Number(t.dayNumber) === dayofweek &&
        Number(t.startTime) <= hour &&
        hour <= t.endTime
    );
    const isOpen: boolean = ot !== undefined && ot.length > 0;
    return { ...mp, isOpen: isOpen };
  });
};
