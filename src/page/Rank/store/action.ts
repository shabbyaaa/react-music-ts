import { Dispatch } from 'redux';
import * as actionTypes from './actionType';
import request from '../../../utils/request';
import { IRankList } from './reducer';

const changeRankList = (data: IRankList) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: data
})

const changeLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_LOADING,
  data: data
})

export const getRankList = () => {
  return (dispatch: Dispatch) => {
    request('/api/server/toplist/detail', 'POST').then((res: any) => {
      dispatch(changeRankList(res && res.list));
      dispatch(changeLoading(false));
    }).catch(() => {
      console.log('排行榜数据获取失败');
    })
  }
};