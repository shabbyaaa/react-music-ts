/*
 * @Author: Shabby申
 * @Date: 2020-08-22 11:10:24
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-22 22:35:25
 * 播放器组件
 */
import React, { ReactElement, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { playMode } from "../../utils/utils";
import * as actionTypes from "./store/action";
import MiniPlayer from "./components/MiniPlayer";
import NormalPlayer from "./components/NormalPlayer";

interface IProps {
  fullScreen?: boolean; // 播放器是否为全屏模式
  playing?: boolean; // 当前歌曲是否播放
  sequencePlayList?: []; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList?: [];
  mode?: number; // 播放模式
  currentIndex?: number; // 当前歌曲在播放列表的索引位置
  showPlayList?: boolean; // 是否展示播放列表
  currentSong?: {};
}

function Player() {
  const dispatch = useDispatch();

  const {
    fullScreen,
    playing,
    // currentSong,
    showPlayList,
    mode,
    currentIndex,
    playList,
    sequencePlayList,
  } = useSelector((state: RootState) => ({
    fullScreen: state.player.fullScreen,
    playing: state.player.playing,
    // currentSong: state.player.currentSong,
    showPlayList: state.player.showPlayList,
    mode: state.player.mode,
    currentIndex: state.player.currentIndex,
    playList: state.player.playList,
    sequencePlayList: state.player.sequencePlayList,
  }));

  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };

  // togglePlayingDispatch (data) {
  //   dispatch (changePlayingState (data));
  // },
  // toggleFullScreenDispatch (data) {
  //   dispatch (changeFullScreen (data));
  // },
  // togglePlayListDispatch (data) {
  //   dispatch (changeShowPlayList (data));
  // },
  // changeCurrentIndexDispatch (index) {
  //   dispatch (changeCurrentIndex (index));
  // },
  // changeCurrentDispatch (data) {
  //   dispatch (changeCurrentSong (data));
  // },
  // changeModeDispatch (data) {
  //   dispatch (changePlayMode (data));
  // },
  // changePlayListDispatch (data) {
  //   dispatch (changePlayList (data));
  // }

  const toggleFullScreenDispatch = (data: any) => {
    dispatch(actionTypes.changeFullScreen(data));
  };

  return (
    <div>
      <MiniPlayer
        toggleFullScreen={toggleFullScreenDispatch}
        fullScreen={fullScreen}
        song={currentSong}
      />
      <NormalPlayer
        toggleFullScreen={toggleFullScreenDispatch}
        fullScreen={fullScreen}
        song={currentSong}
      />
    </div>
  );
}

export default memo(Player);
