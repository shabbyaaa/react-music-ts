import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';


export interface SingerStateType {
  artist: any;
  songsOfArtist: any;
  loading: boolean;
}


const defaultState: SingerStateType = {
  artist: {},
  songsOfArtist: [],
  loading: true
};


export const singerReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      state.artist = action.data;
      break;
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      state.songsOfArtist = action.data;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      state.loading = action.data;
      break;
    default:
      return state;
  }
}, defaultState)