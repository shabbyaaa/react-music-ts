import { Dispatch } from 'redux';
import request from '@utils/request';
import * as actionTypes from './actionType';
import { IBannerList, IRcommendList } from './reducer';

export const changeBannerList = (data: IBannerList) => ({
  type: actionTypes.CHANGE_BANNER,
  data,
})

export const changeRecommendList = (data: IRcommendList) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data,
});

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

// 获取轮播图
export const getBannerList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/banner', "POST").then(res => {
      dispatch(changeBannerList(res.banners));
    }).catch((err) => {
      console.log('err :>> ', err);
    })
  }
}

// 获取推荐歌单
export const getRecommendList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/personalized', "POST").then(res => {
      dispatch(changeRecommendList(res.result));
      dispatch(changeEnterLoading(false));
    }).catch((err) => {
      console.log('err :>> ', err);
    })
  }
}