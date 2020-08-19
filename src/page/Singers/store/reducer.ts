import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';

interface ISingerListType {
  id: number;
  picUrl: string;
  name: string;
}

export type ISingerList = ISingerListType[];

export interface SingerStateType {
  singerList: ISingerList;
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  pageCount: number;
}

const defaultState: SingerStateType = {
  singerList: [],
  enterLoading: true,     //控制进场Loading
  pullUpLoading: false,   //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0            //这里是当前页数，我们即将实现分页功能
}

export const singerReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      state.singerList = action.data;
      break;
    case actionTypes.CHANGE_PAGE_COUNT:
      state.pageCount = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
    case actionTypes.CHANGE_PULLUP_LOADING:
      state.pullUpLoading = action.data;
      break;
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      state.pullDownLoading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)