import { ActionTypes } from "./actionTypes";
import { Dispatch } from "redux";

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

export const addToCart = (
  event: React.MouseEvent<HTMLButtonElement>,
  productId: number
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.ADD_TO_CART,
    payload: { productId }
  });
};

export const removeFromCart = (
  event: React.MouseEvent<HTMLButtonElement>,
  productId: number
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.REMOVE_FROM_CART,
    payload: { productId }
  });
};

// export const removeFromCart = (
//   event: React.MouseEvent<HTMLButtonElement>,
//   productId: number
// ) => (dispatch: Dispatch) => {
//   event.stopPropagation();
//   dispatch({
//     type: ActionTypes.REMOVE_FROM_CART,
//     payload: { productId }
//   });
// };

/*
export const ChangeFullname: ActionCreator<IChangeFullnameDeliver> = (productId) => {
  return {
    type: CHANGE_FULLNAME,
    productId
  };
};

export const ChangeMobile: ActionCreator<IChangeMobileDeliver> = (productId) => {
  return {
    type: CHANGE_MOBILE,
    productId
  };
};

export const ChangeAddress: ActionCreator<IChangeAddressDeliver> = (productId) => {
  return {
    type: CHANGE_ADDRESS,
    productId
  };
};

export const ChangeTime: ActionCreator<IChangeTimeDeliver> = (productId) => {
  return {
    type: CHANGE_TIME,
    productId
  };
};

export const ChangeLocation: ActionCreator<IChangeDeliverLocation> = (location, address) => {
  console.log("actions", location, address);
  return {
    type: CHANGE_LOCATION,
    location,
    address
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
