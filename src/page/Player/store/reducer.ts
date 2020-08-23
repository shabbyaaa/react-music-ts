import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';
import { playMode } from '../../../utils/utils'

export interface PlayerStateType {
  fullScreen: boolean,
  playing: boolean,
  sequencePlayList: any,
  playList: any,
  mode: number,
  currentIndex: number,
  showPlayList: boolean,
  currentSong: any,
  speed: number
}

const defaultState: PlayerStateType = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  speed: 1
};

export const playerReducer = produce((state, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      state.currentSong = action.data;
      break;
    case actionTypes.SET_FULL_SCREEN:
      state.fullScreen = action.data;
      break;
    case actionTypes.SET_PLAYING_STATE:
      state.playing = action.data;
      break;
    case actionTypes.SET_SEQUECE_PLAYLIST:
      state.sequencePlayList = action.data;
      break;
    case actionTypes.SET_PLAYLIST:
      state.playList = action.data;
      break;
    case actionTypes.SET_PLAY_MODE:
      state.mode = action.data;
      break;
    case actionTypes.SET_CURRENT_INDEX:
      state.currentIndex = action.data;
      break;
    case actionTypes.SET_SHOW_PLAYLIST:
      state.showPlayList = action.data;
      break;
    default:
      return state;
  }
}, defaultState)