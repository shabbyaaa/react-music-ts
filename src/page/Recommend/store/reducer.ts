import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';

interface IBannerType {
  imageUrl: string;
  url: string;
  targetId: number;
  [propName: string]: any;
}

export interface IRecommendType {
  id: string;
  name: string;
  picUrl: string;
  trackCount: number;
  playCount: number;
  [propName: string]: any;
}

export type IBannerList = IBannerType[];
export type IRcommendList = IRecommendType[];

export interface RecommendStateType {
  bannerList: IBannerList;
  recommendList: IRcommendList;
  enterLoading: boolean;
}

const defaultState: RecommendStateType = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export const recommendReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      state.bannerList = action.data;
      break;
    case actionTypes.CHANGE_RECOMMEND_LIST:
      state.recommendList = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)

// 先接收 recipe 函数再接收 base，那你可以像produce((draft) => { ... })(base)这样调用
// export default (state = defaultState, action: any) => {
//   return produce(state, draft => {
//     switch (action.type) {
//       case actionTypes.CHANGE_BANNER:
//         draft.bannerList = action.data;
//         break;
//       case actionTypes.CHANGE_RECOMMEND_LIST:
//         draft.recommendList = action.data;
//         break;
//       default:
//         return state;
//     }
//   })
// }