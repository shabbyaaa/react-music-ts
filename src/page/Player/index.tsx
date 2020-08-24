/*
 * @Author: Shabby申
 * @Date: 2020-08-22 11:10:24
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-24 17:10:46
 * 播放器组件
 */
import React, { useState, memo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  playMode,
  getSongUrl,
  isEmptyObject,
  shuffle,
  findIndex,
} from "../../utils/utils";
import * as actionTypes from "./store/action";
import MiniPlayer from "./components/MiniPlayer";
import NormalPlayer from "./components/NormalPlayer";
import PlayList from "./components/PlayList";
import Toast from "../../components/Toast";

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
    currentSong,
    // showPlayList,
    mode,
    currentIndex,
    playList,
    sequencePlayList,
  } = useSelector((state: RootState) => ({
    fullScreen: state.player.fullScreen,
    playing: state.player.playing,
    currentSong: state.player.currentSong,
    // showPlayList: state.player.showPlayList,
    mode: state.player.mode,
    currentIndex: state.player.currentIndex,
    playList: state.player.playList,
    sequencePlayList: state.player.sequencePlayList,
  }));

  const audioRef = useRef<HTMLAudioElement>(null);
  const songReady = useRef(true);

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState<any>({});

  const [modeText, setModeText] = useState("");

  const toastRef = useRef<any>();

  const clickPlaying = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    state: boolean
  ) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  // 处理播放和暂停的逻辑
  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current // 标志位为 false
    )
      return;
    let current = playList[currentIndex];
    setPreSong(current);
    songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    changeCurrentDispatch(current); //赋值currentSong

    audioRef.current!.src = getSongUrl(current.id);
    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current!.play().then(() => {
        songReady.current = true;
      });
    });
    togglePlayingDispatch(true); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
    // eslint-disable-next-line
  }, [playList, currentIndex]);

  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent: any) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current!.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  //一首歌循环
  const handleLoop = () => {
    audioRef.current!.currentTime = 0;
    actionTypes.changePlayingState(true);
    audioRef.current!.play();
  };

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current!.show();
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const handleError = () => {
    songReady.current = true;
    alert("播放出错");
  };

  // 改变播放状态
  const togglePlayingDispatch = (data: boolean) => {
    dispatch(actionTypes.changePlayingState(data));
  };

  // 是否 全屏（播放组件）
  const toggleFullScreenDispatch = (data: any) => {
    dispatch(actionTypes.changeFullScreen(data));
  };

  const changeCurrentIndexDispatch = (index: number) => {
    dispatch(actionTypes.changeCurrentIndex(index));
  };

  const changeCurrentDispatch = (data: any) => {
    dispatch(actionTypes.changeCurrentSong(data));
  };
  //改变playList
  const changePlayListDispatch = (data: any) => {
    dispatch(actionTypes.changePlayList(data));
  };
  //改变mode 播放模式
  const changeModeDispatch = (data: any) => {
    dispatch(actionTypes.changePlayMode(data));
  };
  const togglePlayListDispatch = (data: boolean) => {
    dispatch(actionTypes.changeShowPlayList(data));
  };

  return (
    <div>
      <Toast text={modeText} ref={toastRef}></Toast>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          toggleFullScreen={toggleFullScreenDispatch}
          fullScreen={fullScreen}
          song={currentSong}
          playing={playing}
          percent={percent}
          clickPlaying={clickPlaying}
          togglePlayList={togglePlayListDispatch}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          fullScreen={fullScreen}
          song={currentSong}
          playing={playing}
          duration={duration} //总时长
          currentTime={currentTime} //播放时间
          percent={percent} //进度
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
          togglePlayList={togglePlayListDispatch}
        />
      )}
      <PlayList />
      <audio
        onTimeUpdate={updateTime}
        ref={audioRef}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
    </div>
  );
}

export default memo(Player);
