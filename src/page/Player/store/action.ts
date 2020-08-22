import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';


export const changeCurrentSong = (data: any) => ({
  type: actionTypes.SET_CURRENT_SONG,
  data: data
});

export const changeFullScreen =  (data: boolean) => ({
  type: actionTypes.SET_FULL_SCREEN,
  data: data
});

export const changePlayingState = (data: boolean) => ({
  type: actionTypes.SET_PLAYING_STATE,
  data: data
});

export const changeSequecePlayList = (data: any) => ({
  type: actionTypes.SET_SEQUECE_PLAYLIST,
  data: data
});

export const changePlayList  = (data: boolean) => ({
  type: actionTypes.SET_PLAYLIST,
  data: data
});

export const changePlayMode = (data: boolean) => ({
  type: actionTypes.SET_PLAY_MODE,
  data: data
});

export const changeCurrentIndex = (data: number) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  data: data
});

export const changeShowPlayList = (data: boolean) => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  data: data
});