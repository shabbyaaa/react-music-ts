import React, { useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  prefixStyle,
  getName,
  playMode,
  shuffle,
  findIndex,
} from "../../../../utils/utils";
import { RootState } from "../../../../store";
import * as actionTypes from "../../store/action";
import Scroll from "../../../../components/Scroll";
import Confirm from "../../../../components/Confirm";
import styles from "./style.less";
import { MyIcon } from "src/utils/request";

function PlayList(props: any) {
  const dispatch = useDispatch();
  const {
    showPlayList,
    currentIndex,
    currentSong,
    playList,
    sequencePlayList,
    mode,
  } = useSelector((state: RootState) => ({
    showPlayList: state.player.showPlayList,
    currentIndex: state.player.currentIndex,
    currentSong: state.player.currentSong,
    playList: state.player.playList,
    sequencePlayList: state.player.sequencePlayList,
    mode: state.player.mode,
  }));

  const playListRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const confirmRef = useRef<any>(null);
  const listContentRef = useRef<any>();
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true);

  //touchStart 后记录 y 值
  const [startY, setStartY] = useState(0);
  //touchStart 事件是否已经被触发
  const [initialed, setInitialed] = useState<any>(0);
  // 用户下滑的距离
  const [distance, setDistance] = useState(0);

  const transform: any = prefixStyle("transform");

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    listWrapperRef.current!.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    // 让列表展现
    listWrapperRef.current!.style["transition"] = "all 0.3s";
    listWrapperRef.current!.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current!.style["transition"] = "all 0.3s";
    listWrapperRef.current!.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current!.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const togglePlayListDispatch = (data: boolean) => {
    dispatch(actionTypes.changeShowPlayList(data));
  };

  // 修改当前歌曲在列表中的 index，也就是切歌
  const changeCurrentIndexDispatch = (data: any) => {
    dispatch(actionTypes.changeCurrentIndex(data));
  };
  // 修改当前的播放模式
  const changeModeDispatch = (data: any) => {
    dispatch(actionTypes.changePlayMode(data));
  };
  // 修改当前的歌曲列表
  const changePlayListDispatch = (data: any) => {
    dispatch(actionTypes.changePlayList(data));
  };

  // 删除歌曲
  const deleteSongDispatch = (data: any) => {
    dispatch(actionTypes.deleteSong(data));
  };

  // 清除全部歌曲
  const clearDispatch = () => {
    // 1. 清空两个列表
    dispatch(actionTypes.changePlayList([]));
    dispatch(actionTypes.changeSequecePlayList([]));
    // 2. 初始 currentIndex
    dispatch(actionTypes.changeCurrentIndex(-1));
    // 3. 关闭 PlayList 的显示
    dispatch(actionTypes.changeShowPlayList(false));
    // 4. 将当前歌曲置空
    dispatch(actionTypes.changeCurrentSong({}));
    // 5. 重置播放状态
    dispatch(actionTypes.changePlayingState(false));
  };

  // 是不是当前正在播放的歌曲
  const getCurrentIcon = (item: any) => {
    const current = currentSong.id === item.id;
    return (
      <span className={`${styles.current} ${styles.iconfont}`}>
        {current ? <MyIcon type="iconbofang" /> : null}
      </span>
    );
  };

  const changeMode = (e: any) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  };

  // 点击切歌实现
  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
  };

  const handleDeleteSong = (e: any, song: any) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

  const handleShowClear = () => {
    confirmRef.current!.show();
  };

  const handleConfirmClear = () => {
    clearDispatch();
  };

  const handleTouchStart = (e: any) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current!.style["transition"] = "";
    setStartY(e.nativeEvent.touches[0].pageY); // 记录 y 值
    setInitialed(true);
  };
  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) return;
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance); // 记录下滑距离
    listWrapperRef.current!.style.transform = `translate3d(0, ${distance}px, 0)`;
  };
  const handleTouchEnd = (e: any) => {
    setInitialed(false);
    // 这里设置阈值为 150px
    if (distance >= 150) {
      // 大于 150px 则关闭 PlayList
      togglePlayListDispatch(false);
    } else {
      // 否则反弹回去
      listWrapperRef.current!.style["transition"] = "all 0.3s";
      listWrapperRef.current!.style[transform] = `translate3d(0px, 0px, 0px)`;
    }
  };

  const handleScroll = (pos: any) => {
    // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
    let state = pos.y === 0;
    setCanTouch(state);
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames={{
        enter: styles.listFadeEnter,
        enterActive: styles.listFadeEnterActive,
        exit: styles.listFadeExit,
        exitActive: styles.listFadeExitActive,
      }}
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <div
        className={styles.PlayListWrapper}
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className={styles.list_wrapper}
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.ListHeader}>
            <h1 className={styles.title}>
              <div>
                {mode === playMode.sequence ? (
                  <>
                    <span onClick={(e) => changeMode(e)}>
                      <MyIcon type="iconshunxu" className={styles.iconfont} />
                    </span>
                    <span
                      className={styles.text}
                      onClick={(e) => changeMode(e)}
                    >
                      顺序播放
                    </span>
                  </>
                ) : mode === playMode.loop ? (
                  <>
                    <span onClick={(e) => changeMode(e)}>
                      <MyIcon
                        type="iconicon-xunhuan"
                        className={styles.iconfont}
                      />
                    </span>
                    <span
                      className={styles.text}
                      onClick={(e) => changeMode(e)}
                    >
                      循环播放
                    </span>
                  </>
                ) : (
                  <>
                    <span onClick={(e) => changeMode(e)}>
                      <MyIcon type="iconsuiji" className={styles.iconfont} />
                      <span
                        className={styles.text}
                        onClick={(e) => changeMode(e)}
                      >
                        随机循环
                      </span>
                    </span>
                  </>
                )}
              </div>
              <span
                className={`${styles.iconfont} ${styles.clear}`}
                onClick={handleShowClear}
              >
                <MyIcon type="iconshanchu" />
              </span>
            </h1>
          </div>
          <div className={styles.ScrollWrapper}>
            <Scroll
              ref={listContentRef}
              onScroll={(pos: any) => handleScroll(pos)}
              bounceTop={false}
            >
              <div className={styles.ListContent}>
                {playList.map((item: any, index: number) => {
                  return (
                    <li
                      className={styles.item}
                      key={item.id}
                      onClick={() => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className={styles.text}>
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className={styles.like}>
                        <span>
                          <MyIcon type="iconxin" className={styles.iconfont} />
                        </span>
                      </span>
                      <span
                        className={styles.delete}
                        onClick={(e) => handleDeleteSong(e, item)}
                      >
                        <MyIcon
                          type="iconshanchu"
                          className={styles.iconfont}
                        />
                      </span>
                    </li>
                  );
                })}
              </div>
            </Scroll>
          </div>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除全部？"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        />
      </div>
    </CSSTransition>
  );
}
export default PlayList;
