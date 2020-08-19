import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';
import { ISingerList } from './reducer';

export const changeSingerList = (data: ISingerList) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data,
})

export const changePageCount = (data: number) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const changePullUpLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
});

export const changePullDownLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
});

//第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/top/artists?offset=0', 'POST').then((res: any) => {
      dispatch(changeSingerList(res.artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
  }
};

//加载更多热门歌手
export const refreshMoreHotSingerList = (pageCount: number) => {
  console.log('pageCount', pageCount)
  return (dispatch: Dispatch) => {
    request(`/api/server/top/artists?offset=${pageCount}`, 'POST').then((res: any) => {
      dispatch(changeSingerList([...res.artists]));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
  }
};

//第一次加载对应类别的歌手
export const getSingerList = (category: string, alpha: string) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=0`, 'POST').then(res => {
      dispatch(changeSingerList(res.artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    })
  }
};

//加载更多歌手
export const refreshMoreSingerList = (category: string, alpha: string, pageCount: number) => {
  return (dispatch: Dispatch) => {
    request(`/api/server/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${pageCount}`, 'POST').then(res => {
      dispatch(changeSingerList([...res.artists]));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    })
  }
};