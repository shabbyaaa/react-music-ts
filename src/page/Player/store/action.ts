import * as actionTypes from './actionType';
import request from '../../../utils/request';
import { Dispatch } from 'redux';



export const changeCurrentSong = (data: any) => ({
  type: actionTypes.SET_CURRENT_SONG,
  data: data
});

export const changeFullScreen = (data: boolean) => ({
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

export const changePlayList = (data: any) => ({
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

export const deleteSong = (data: any) => ({
  type: actionTypes.DELETE_SONG,
  data: data
});

export const insertSong = (data: any) => ({
  type: actionTypes.INSERT_SONG,
  data: data
});


export const getSongDetail = (id: number) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/song/detail?ids=${id}`, 'POST').then((res: any) => {
      dispatch(insertSong(res.songs[0]));
    }).catch((e) => {
      console.log('e', e)
    })
  }
}