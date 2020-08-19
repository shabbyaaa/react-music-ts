import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';
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

export const getBannerList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/banner', "POST").then((res: any) => {
      dispatch(changeBannerList(res.banners));
    }).catch((err) => {
      console.log('err :>> ', err);
    })
  }
}

export const getRecommendList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/personalized', "POST").then((res: any) => {
      dispatch(changeRecommendList(res.result));
      dispatch(changeEnterLoading(false));
    }).catch((err) => {
      console.log('err :>> ', err);
    })
  }
}