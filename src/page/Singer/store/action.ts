import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';

const changeArtist = (data: any) => ({
  type: actionTypes.CHANGE_ARTIST,
  data: data
});

const changeSongs = (data: any) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data: data
})
export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: data
})


export const getSingerInfo = (id: number) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/artists?id=${id}`, 'POST').then((res: any) => {
      dispatch(changeArtist(res.artist));
      dispatch(changeSongs(res.hotSongs));
      dispatch(changeEnterLoading(false));
    })
  }
}