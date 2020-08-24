import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';

const changeCurrentAlbum = (data: any) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: data
});

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getAlbumList = (id: number) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/playlist/detail?id=${id}`, 'POST').then((res: any) => {
      dispatch(changeCurrentAlbum(res.playlist));
      dispatch(changeEnterLoading(false));
    }).catch(() => {
      console.log("获取 album 数据失败！")
    })
  }
};