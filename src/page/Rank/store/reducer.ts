import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';

export interface ITracksType {
  first: string;
  second: string;
  [propname: string]: any;
}

export interface IRankListType {
  id: number;
  updateFrequency: string;
  coverImgUrl: string;
  tracks: ITracksType;
  [propname: string]: any;
}

export type IRankList = IRankListType[];

export interface RankStateType {
  rankList: IRankList;
  loading: boolean;
}

const defaultState: RankStateType = {
  rankList: [],
  loading: true
}


export const rankReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      state.rankList = action.data;
      break;
    case actionTypes.CHANGE_LOADING:
      state.loading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)