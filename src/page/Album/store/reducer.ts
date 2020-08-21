import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';

export interface ICurrentAlbumType {
  creator?: {};
  coverImgUrl?: string;
  subscribedCount?: number;
  name?: string;
  tracks?: [];
}

// currentAlbum里面数据太多，用any代替了
export interface AlbumStateType {
  currentAlbum: any,
  enterLoading: boolean,
}

const defaultState: AlbumStateType = {
  currentAlbum: {},
  enterLoading: false,
}

export const albumReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      state.currentAlbum = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)