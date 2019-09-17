import { ActionTypes } from "./actionTypes";
import { Dispatch } from "redux";
import { AppPages } from "../reducers/app";

// export const scorePage = () => dispatch => {
//     //...
//     dispatch({
//         type: SCORE_PAGE,
//         payload: []
//     })
// }

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

export const changeTabId: Function = (tabId: number) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: ActionTypes.CHANGE_TAB_ID,
    payload: { tabId }
  });
};
