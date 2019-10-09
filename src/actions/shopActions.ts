import { ActionTypes } from "./actionTypes";
import { Dispatch } from "redux";
import { Moment } from "moment-jalaali";

export const addToCart: any = (
  event: React.MouseEvent<HTMLButtonElement>,
  productId: number,
  marketId: number
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.ADD_TO_CART,
    payload: { productId, marketId }
  });
};

export const removeFromCart: any = (
  event: React.MouseEvent<HTMLButtonElement>,
  productId: number,
  marketId: number
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.REMOVE_FROM_CART,
    payload: { productId, marketId }
  });
};

export const ChangeDeliverKind: any = (
  event: React.ChangeEvent<{ name?: string; value: unknown }>,
  deliverKind: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_DELIVERKIND,
    payload: { deliverKind }
  });
};

export const ChangeDeliverDistrict: any = (
  event: React.ChangeEvent<{ name?: string; value: unknown }>,
  deliverDistrict: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_DELIVERDISTRICT,
    payload: { deliverDistrict }
  });
};

export const ChangeMobile: any = (
  event: React.ChangeEvent<HTMLInputElement>,
  mobile: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_MOBILE,
    payload: { mobile }
  });
};

export const ChangeFullname: any = (
  event: React.ChangeEvent<HTMLButtonElement>,
  fullname: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_FULLNAME,
    payload: { fullname }
  });
};

export const ChangeAddress: any = (
  event: React.ChangeEvent<HTMLButtonElement>,
  address: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_ADDRESS,
    payload: { address }
  });
};

export const ChangeDate: any = (
  // event: React.MouseEvent<HTMLButtonElement>,
  date: Moment
) => (dispatch: Dispatch) => {
  // event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_DATE,
    payload: { date }
  });
};

export const ChangeTime: any = (
  event: React.MouseEvent<HTMLButtonElement>,
  time: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_TIME,
    payload: { time }
  });
};

export const ChangeLocation: any = (
  event: React.MouseEvent<HTMLButtonElement>,
  location: Position
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_LOCATION,
    payload: { location }
  });
};

// export const scorePage = () => dispatch => {
//     //...
//     dispatch({
//         type: SCORE_PAGE,
//         payload: []
//     })
// }
/*
export const changePage: Function = (
  event: React.MouseEvent<HTMLButtonElement>,
  newPage: AppPages,
  levelId: number
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_PAGE,
    payload: { levelId, newPage }
  });
};


export const changeStage =
    (event: React.MouseEvent<HTMLButtonElement>,stageId:string, score:number, backgroundPic:string) => (dispatch:Dispatch) => {

    event.stopPropagation();
    // console.log('changeStage actions', event, stageId, score,backgroundPic);
    dispatch({
        type: ActionTypes.CHANGE_STAGE,
        payload: { stageId, score,backgroundPic }
    })
}
/*
/*
export const pauseGame = (event:React.MouseEvent<HTMLButtonElement>, show:boolean = true) => (dispatch:Dispatch) => {

    event.stopPropagation();
    dispatch({
        type: show ? ActionTypes.PAUSE_GAME : ActionTypes.RESUME_PAGE,
        payload: { isPaused: show }
    })
}
*/
/*
export const ChangeMobile: ActionCreator<IChangeMobileDeliver> = (productId) => {
  return {
    type: CHANGE_MOBILE,
    productId
  };
};

export const LoadUserInfo: ActionCreator<ILoadUserInfo> = (name, mobile, address, latitude, longitude) => {
  console.log("actions", name, mobile, address, latitude, longitude);
  return {
    type: LOAD_USER_INFO,
    name, mobile, address, latitude, longitude
  };
};
*/
