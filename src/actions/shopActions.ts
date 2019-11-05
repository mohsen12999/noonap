import { ActionTypes } from "./actionTypes";
import { Dispatch } from "redux";
import { Moment } from "moment-jalaali";
import {
  ICustomer,
  IDbInfo,
  IMarketPlus,
  MakeMarketPlus,
  IMakeOrder
} from "./shop";
import { IDeliverState, ICartState } from "../reducers/shop";
import { push } from "connected-react-router";
import { AppPages } from "../reducers/app";

export const addToCart: Function = (
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

export const removeFromCart: Function = (
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

export const ChangeDeliverKind: Function = (
  event: React.ChangeEvent<{ name?: string; value: unknown }>,
  deliverKind: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_DELIVERKIND,
    payload: { deliverKind }
  });
};

export const ChangeDeliverDistrict: Function = (
  event: React.ChangeEvent<{ name?: string; value: unknown }>,
  deliverDistrict: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_DELIVERDISTRICT,
    payload: { deliverDistrict }
  });
};

export const ChangeMobile: Function = (
  event: React.ChangeEvent<HTMLInputElement>,
  mobile: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_MOBILE,
    payload: { mobile }
  });
};

export const ChangeFullname: Function = (
  event: React.ChangeEvent<HTMLButtonElement>,
  fullname: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_FULLNAME,
    payload: { fullname }
  });
};

export const ChangeAddress: Function = (
  event: React.ChangeEvent<HTMLButtonElement>,
  address: string
) => (dispatch: Dispatch) => {
  event.stopPropagation();
  dispatch({
    type: ActionTypes.CHANGE_ADDRESS,
    payload: { address }
  });
};

export const ChangeDate: Function = (
  // event: React.MouseEvent<HTMLButtonElement>,
  date: Moment
) => (dispatch: Dispatch) => {
  // event.stopPropagation();
  console.log(date);
  if (date.isValid()) {
    dispatch({
      type: ActionTypes.CHANGE_DATE,
      payload: { date }
    });
  }
};

export const ChangeTime: Function = (
  // event: React.MouseEvent<HTMLButtonElement>,
  date: Moment
) => (dispatch: Dispatch) => {
  // event.stopPropagation();
  if (date.isValid()) {
    dispatch({
      type: ActionTypes.CHANGE_TIME,
      payload: { date }
    });
  }
};

export const loadData: Function = () => (dispatch: Dispatch) => {
  // const url: string = "https://apdr.ir/api/markets";
  const url: string = "http://localhost/laravel_api/public/api/markets";

  dispatch({
    type: ActionTypes.TRY_LOADING_INIT
  });

  fetch(url, { method: "GET" })
    .then(res => res.json())
    .then(res => {
      if (res.error || res.result === false) {
        console.log(res.error);
        dispatch({
          type: ActionTypes.FAILED_LOAD_INIT,
          payload: { error: res.error }
        });
      }
      const info: IDbInfo = res;
      // console.log(info);
      // const markets: IMarket[] = info.markets;
      // const openTimes: IOpenTime[] = info.openTimes;
      const marketPlus: IMarketPlus[] = MakeMarketPlus(
        info.markets,
        info.openTimes
      );

      dispatch({
        type: ActionTypes.SUCCESS_LOAD_INIT,
        payload: {
          // info: info,
          groups: info.groups,
          markets: marketPlus,
          openTimes: info.openTimes,
          products: info.products
        }
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ActionTypes.FAILED_LOAD_INIT,
        payload: { error }
      });
    });
};

export const LoadUserInfo: any = (mobile: string) => (dispatch: Dispatch) => {
  const url: string = "https://apdr.ir/api/customers/" + mobile;

  dispatch({
    type: ActionTypes.TRY_LOADING_USER_INFO
  });

  fetch(url, { method: "GET" })
    .then(res => res.json())
    .then(res => {
      if (res.error || res.result === false) {
        dispatch({
          type: ActionTypes.FAILED_LOAD_USER_INFO,
          payload: { error: res.error }
        });
      }
      const customer: ICustomer = res.customer;
      dispatch({
        type: ActionTypes.SUCCESS_LOAD_USER_INFO,
        payload: {
          fullname: customer.name,
          district: customer.district,
          address: customer.address
        }
      });
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FAILED_LOAD_USER_INFO,
        payload: { error }
      });
    });
};

export const LoadLocation: any = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.TRY_LOADING_LOCATION
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      if (position && position !== undefined) {
        const crd: Coordinates = position.coords;
        const url: string =
          "https://api.neshan.org/v2/reverse?lat=" +
          crd.latitude +
          "&lng=" +
          crd.longitude;

        fetch(url, {
          method: "GET",
          headers: {
            "Api-Key": "service.idR8Yra0Ji4A4DHlaIj54K0VUl7kX7DglvojWyjG"
          }
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res);
            const status: string = res["status"];
            const address: string = res["formatted_address"];
            if (
              status !== undefined &&
              status === "OK" &&
              address !== undefined
            ) {
              dispatch({
                type: ActionTypes.SUCCESS_LOAD_LOCATION,
                payload: {
                  address: address,
                  location: position
                }
              });
            } else {
              dispatch({
                type: ActionTypes.FAILED_LOAD_LOCATION,
                payload: { error: status }
              });
            }
          })
          .catch(error => {
            dispatch({
              type: ActionTypes.FAILED_LOAD_LOCATION,
              payload: { error }
            });
          });
      } else {
        dispatch({
          type: ActionTypes.FAILED_LOAD_LOCATION,
          payload: { error: "position " + position }
        });
      }
    });
  } else {
    dispatch({
      type: ActionTypes.FAILED_LOAD_LOCATION,
      payload: { error: "navigator.geolocation " + navigator.geolocation }
    });
  }

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position)=> {
  //     if(position && position !== undefined) {
  //       const crd:Coordinates = position.coords;
  //       const url: string = "https://api.neshan.org/v2/reverse?lat=" + crd.latitude + "&lng=" + crd.longitude;
  //       fetch(url, {
  //         method: "GET",
  //         headers: { "Api-Key": "service.idR8Yra0Ji4A4DHlaIj54K0VUl7kX7DglvojWyjG" }
  //     }).then(res => res.json()).then((res:any)=>{
  //       const status: string = res["status"];
  //       const address: string = res["formatted_address"];
  //       if(status !== undefined && status === "OK" && address !== undefined) {
  //         // store.dispatch(ChangeLocation(position,address));
  //         dispatch({
  //           type: ActionTypes.SUCCESS_LOAD_LOCATION,
  //           payload: {
  //             address:address,
  //             latitude:crd.latitude,
  //             longitude:crd.longitude
  //           }
  //         });
  //         return;
  //       }
  //     }).catch(error=>{
  //       dispatch({
  //         type: ActionTypes.FAILED_LOAD_LOCATION,
  //         payload: { error }
  //       });
  //     }
  //       );
  //     }
  //   }

  //   dispatch({
  //     type: ActionTypes.FAILED_LOAD_LOCATION
  //   });
};

export const MakeOrder: any = (
  marketId: string,
  cart: ICartState,
  deliver: IDeliverState
) => (dispatch: Dispatch) => {
  // const url: string = "https://apdr.ir/api/makeorder";
  const url: string = "http://localhost/laravel_api/public/api/makeorder";

  dispatch({
    type: ActionTypes.TRY_MAKING_ORDER
  });
  const send_info: any = {
    marketId,
    cart,
    ...deliver,
    datedate: deliver.date.toDate(),
    datest: deliver.date.format("YYYY/MM/DD hh:mm A")
  };

  fetch(url, { method: "POST", body: JSON.stringify(send_info) })
    .then(res => res.json())
    .then(res => {
      if (res.error || res.result === false) {
        dispatch({
          type: ActionTypes.FAILED_MAKE_ORDER,
          payload: { error: res.error }
        });
      }
      // console.log(res);
      const result: IMakeOrder = res as IMakeOrder;
      dispatch({
        type: ActionTypes.SUCCESS_MAKE_ORDER,
        payload: {
          order: result.order,
          orderDetails: result.orderDetails
        }
      });
      dispatch(
        push(process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT + "/" + result.id)
      );
      // console.log("push");
      // push(process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT + "/" + result.id);
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FAILED_MAKE_ORDER,
        payload: { error }
      });
    });
};

export const loadOrder: any = (orderId: string) => (dispatch: Dispatch) => {
  // const url: string = "https://apdr.ir/api/order/"+orderId;
  const url: string =
    "http://localhost/laravel_api/public/api/order/" + orderId;

  dispatch({
    type: ActionTypes.TRY_LOADING_ORDER
  });

  fetch(url, { method: "GET" })
    .then(res => res.json())
    .then(res => {
      if (res.error || res.result === false) {
        dispatch({
          type: ActionTypes.FAILED_LOAD_ORDER,
          payload: { error: res.error }
        });
      }
      const { order, order_details } = res;
      dispatch({
        type: ActionTypes.SUCCESS_LOAD_ORDER,
        payload: {
          order: order,
          orderDetails: order_details
        }
      });
      // console.log("push");
      // push(process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT + "/" + result.id);
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FAILED_LOAD_ORDER,
        payload: { error }
      });
    });
};

export const send2Bank: any = (orderId: string) => (dispatch: Dispatch) => {
  // const url: string = "https://apdr.ir/api/sendorder;
  const url: string = "http://localhost/laravel_api/public/api/sendorder";

  dispatch({
    type: ActionTypes.TRY_SENDING_ORDER_TO_BANK
  });

  fetch(url, { method: "POST", body: JSON.stringify({ id: orderId }) })
    .then(res => res.json())
    .then(res => {
      if (res.error || res.result === false) {
        dispatch({
          type: ActionTypes.FAILED_SEND_ORDER_TO_BANK,
          payload: { error: res.error }
        });
      }
      console.log(res);
      const { url } = res;
      window.location.href = url;
      // dispatch(push(url));
      // dispatch({
      //   type: ActionTypes.SUCCESS_SEND_ORDER_TO_BANK,
      //   payload: {
      //     tocken: res.tocken
      //   }
      // });
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FAILED_SEND_ORDER_TO_BANK,
        payload: { error }
      });
    });
};

// export const ChangeTime: any = (
//   event: React.MouseEvent<HTMLButtonElement>,
//   time: string
// ) => (dispatch: Dispatch) => {
//   event.stopPropagation();
//   dispatch({
//     type: ActionTypes.CHANGE_TIME,
//     payload: { time }
//   });
// };

// export const ChangeLocation: any = (
//   event: React.MouseEvent<HTMLButtonElement>,
//   location: Position
// ) => (dispatch: Dispatch) => {
//   event.stopPropagation();
//   dispatch({
//     type: ActionTypes.CHANGE_LOCATION,
//     payload: { location }
//   });
// };

//////////////////////////////////////////////////////

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
