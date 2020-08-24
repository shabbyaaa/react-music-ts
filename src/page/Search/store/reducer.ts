import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';


export interface SerachStateType {
  hotList: any;
  suggestList: any;
  songsList: any;
  enterLoading: boolean;
}

const defaultState: SerachStateType = {
  hotList: [], // 热门关键词列表
  suggestList: [],// 列表，包括歌单和歌手
  songsList: [],// 歌曲列表
  enterLoading: false
}

export const searchReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_HOT_KEYWRODS:
      state.hotList = action.data;
      break;
    case actionTypes.SET_SUGGEST_LIST:
      state.suggestList = action.data;
      break;
    case actionTypes.SET_RESULT_SONGS_LIST:
      state.songsList = action.data;
      break;
    case actionTypes.SET_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)