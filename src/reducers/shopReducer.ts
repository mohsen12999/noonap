import { ActionTypes } from "../actions/actionTypes";
import { Reducer } from "redux";
import { IShopState, INITIAL_SHOPSTATE, ICartState } from "./shop";

const ShopReducer: Reducer<IShopState, { type: any; payload: any }> = (
  state = INITIAL_SHOPSTATE,
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PAGE:
      const newPage: any = action.payload.newPage;
      return {
        ...state,
        pageName: newPage
      };

    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        products: state.products,
        cart: cart(state.cart, action),
        deliver: state.deliver,
        error: state.error
      };
    // const productId = action.payload.productId;
    // const cart = state.cart;

    // return {
    //   ... state,
    // }
    /*
        case ActionTypes.CHANGE_PAGE:
          // console.log('change page reducer');//, action.payload);

          if (!action.payload.levelId) {

            let newPage = action.payload.newPage;
            let pageSetting = (gameData as any)[newPage] as appPage;
            let pageTitle = pageSetting.pageTitle;

            return {
              ...state,

              backgroundPic: pageSetting.backgroundPic,
              music: pageSetting.music,

              headerTitle: pageTitle,
              // currentLevelId:
              //currentStage

              saveChoise: [...state.saveChoise, {
                action: ActionTypes.CHANGE_PAGE,
                page: newPage
              }],

              pageName: newPage,
              pageSetting,

              isPaused: false,
              //chaptersInfo:
            }
          }

          let thisLevel = gameData.levels.find(level => level.levelId === action.payload.levelId) || gameData.levels[0];
          let music = thisLevel.backgroundMusic;

          return {
            ...state,

            backgroundPic: thisLevel.levelPic,
            music,

            headerTitle: thisLevel.levelName,
            currentLevelId: thisLevel.levelId,
            currentStage: thisLevel.stages.find(stage => stage.stageId === 1),

            saveChoise: [...state.saveChoise, {
              action: ActionTypes.CHANGE_PAGE,
              page: action.payload.newPage,
              levelId: action.payload.levelId
            }],

            pageName: action.payload.newPage,
            // pageSetting,

            isPaused: false,
            //chaptersInfo:
          }

        case ActionTypes.CHANGE_STAGE:
          //console.log('change stage reducer');

          let stageId = action.payload.stageId;
          if (!stageId) {
            stageId = (state.currentStage ? state.currentStage.stageId : 0 )+ 1;
          }

          let score = state.score;
          if (action.payload.score) {
            score += action.payload.score;
          }

          //let currentStage = state.currentLevel? state.currentLevel.stages.find(stage => stage.stageId === stageId):null;
          //let currentStage = state.currentLevelId? state.currentLevel.stages.find(stage => stage.stageId === stageId):null;
          let currentlevel = gameData.levels.find(level => level.levelId === state.currentLevelId);
          let currentStage = currentlevel && currentlevel.stages.find(stage => stage.stageId === stageId);

          if (!currentStage) {
            console.log('can not find stage');
            return {
              ...state,

              pageName: 'chapterPage', // or end stage score page
              saveChoise: [...state.saveChoise, {
                action: ActionTypes.CHANGE_STAGE,
                stage: 'cannot find stage. maybe end of stage'
              }],
            }
          }

          let backgroundPic = state.backgroundPic;
          if (action.payload.backgroundPic && action.payload.backgroundPic !== '') {
            backgroundPic = action.payload.backgroundPic;
          }

          if (currentStage.optionsSection && currentStage.backgroundPic && currentStage.backgroundPic !== '') {
            console.log("change");
            backgroundPic = currentStage.backgroundPic;
          }

          return {
            ...state,
            currentStage,
            score,
            backgroundPic,
            saveChoise: [...state.saveChoise, {
              action: ActionTypes.CHANGE_STAGE,
              stageId: stageId
            }],
          }

        case ActionTypes.PAUSE_GAME:
          console.log('pause game reducer');
          return {
            ...state,
            isPaused: true,
            //items: action.payload
          }

        case ActionTypes.RESUME_PAGE:
          console.log('resume game reducer');
          return {
            ...state,
            isPaused: false,
            //items: action.payload
          }*/

    default:
      return state;
  }
};

const cart = (state: ICartState, action: { type: any; payload: any }) => {
  console.log("-- action", action, action.type);

  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const addId = action.payload.productId;
      return {
        ...state,
        [addId]: (state[addId] || 0) + 1
      };

    case ActionTypes.REMOVE_FROM_CART:
      const removeId = action.payload.productId;
      const quantity = (state[removeId] || 0) - 1;
      if (quantity <= 0) {
        const newState = { ...state };
        delete newState[removeId];
        return newState;
      } else {
        return {
          ...state,
          [removeId]: quantity
        };
      }
      
    // case CHECKOUT_SUCCESS:
    //   return {};
    default:
      return state;
  }
};

export default ShopReducer;
