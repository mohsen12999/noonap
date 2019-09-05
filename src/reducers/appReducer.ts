import { ActionTypes } from "../actions/actionTypes";
import { IAppState, INITIAL_APPSTATE } from "./app";
import { Reducer } from "redux";

const AppReducer: Reducer<IAppState, { type: any; payload: any }> = (
  state = INITIAL_APPSTATE,
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      const newPage: any = action.payload.newPage;
      return {
        ...state,
        pageName: newPage
      };

    //     case UPDATE_PAGE:
    //       return {
    //         ...state,
    //         page: action.page,
    //         pageName: action.pageName
    //       };
    //     case UPDATE_OFFLINE:
    //       return {
    //         ...state,
    //         offline: action.offline
    //       };
    //     case UPDATE_DRAWER_STATE:
    //       return {
    //         ...state,
    //         drawerOpened: action.opened
    //       };
    //     case OPEN_SNACKBAR:
    //       return {
    //         ...state,
    //         snackbarOpened: true
    //       };
    //     case CLOSE_SNACKBAR:
    //       return {
    //         ...state,
    //         snackbarOpened: false
    //       };
    default:
      return state;
  }
};

export default AppReducer;
