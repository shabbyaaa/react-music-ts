import * as actionTypes from './actionType';
import { produce } from 'immer';
import { AnyAction } from 'redux';
import { playMode, findIndex } from '../../../utils/utils'

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

const handleDeleteSong = (state: any, song: any) => {
  // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex(song, playList);
  playList.splice(fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < currentIndex) currentIndex--;
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);
  state.playList = playList;
  state.sequencePlayList = sequenceList;
  state.currentIndex = currentIndex;
}

const handleInsertSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequencePlayList));
  let currentIndex = state.currentIndex;
  //看看有没有同款
  let fpIndex = findIndex(song, playList);
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1) return;
  currentIndex++;
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playList.splice(fpIndex + 1, 1);
    }
  }

  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }

  state.playList = playList;
  state.sequencePlayList = sequenceList;
  state.currentIndex = currentIndex;
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
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data);
    case actionTypes.INSERT_SONG:
      return handleInsertSong(state, action.data);
    default:
      return state;
  }
}, defaultState)