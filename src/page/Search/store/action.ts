import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';

const changeHotKeyWords = (data: any) => ({
  type: actionTypes.SET_HOT_KEYWRODS,
  data: data
});

const changeSuggestList = (data: any) => ({
  type: actionTypes.SET_SUGGEST_LIST,
  data: data
});

const changeResultSongs = (data: any) => ({
  type: actionTypes.SET_RESULT_SONGS_LIST,
  data: data
});

export const changeEnterLoading = (data: any) => ({
  type: actionTypes.SET_ENTER_LOADING,
  data
});

export const getHotKeyWords = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/search/hot', 'POST').then((res: any) => {
      dispatch(changeHotKeyWords(res.result.hots));
    }).catch((e) => {
      console.log('e', e)
    })
  }
};
export const getSuggestList = (query: any) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/search/suggest?keywords=${query}`, 'POST').then((res: any) => {
      if (!res) return;
      dispatch(changeSuggestList(res.result || []));
    }).catch((e) => {
      console.log('e', e)
    })
    request(`/api/server/search?keywords=${query}`, 'POST').then((res: any) => {
      if (!res) return;
      dispatch(changeResultSongs(res.result.songs || []));
      dispatch(changeEnterLoading(false));// 关闭 loading
    })
  }
};