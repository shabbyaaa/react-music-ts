/*
 * @Author: Shabby申
 * @Date: 2020-08-21 19:59:30
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-09-01 09:28:34
 * 具体歌手页面
 */
import React, { useState, memo, useCallback, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "@components/Header";
import Loading from "@components/Loading1";
import { MyIcon } from "@utils/request";
import { HEADER_HEIGHT, isEmptyObject } from "@utils/utils";
import { RootState } from "@/store";
import Scroll from "@components/Scroll";
import SongsList from "@components/SongList";
import MusicNote from "@components/MusicNote";
import { PosType } from "@components/Scroll";
import * as actionTypes from "./store/action";
import styles from "./style.less";

function Singer(props: any) {
  const dispatch = useDispatch();
  const { artist, songsOfArtist, loading, playList } = useSelector(
    (state: RootState) => ({
      artist: state.singer.artist,
      songsOfArtist: state.singer.songsOfArtist,
      loading: state.singer.loading,
      playList: state.player.playList,
    })
  );
  const musicNoteRef = useRef<any>(null);
  // 动画下落的触发
  const musicAnimation = (x: number, y: number) => {
    musicNoteRef.current!.startAnimation({ x, y });
  };

  const [showStatus, setShowStatus] = useState(true);
  const header = useRef<HTMLElement | null>(null);
  const collectButton = useRef<HTMLDivElement | null>(null);
  const imageWrapper = useRef<HTMLDivElement | null>(null);
  const songScrollWrapper = useRef<HTMLDivElement | null>(null);
  const songScroll = useRef<any | null>(null);
  const layer = useRef<HTMLDivElement | null>(null);

  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(actionTypes.changeEnterLoading(true));
    dispatch(actionTypes.getSingerInfo(id));

    let h = imageWrapper.current!.offsetHeight;
    songScrollWrapper.current!.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current!.style.top = `${h - OFFSET}px`;
    songScroll.current!.refresh();
    //eslint-disable-next-line
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: PosType) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current!;
    const buttonDOM = collectButton.current!;
    const headerDOM = header.current!;
    const layerDOM = layer.current!;
    // 图片
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    // 向下拉   向上滑没超过Header  超过Header
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = "1";
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = "0";
      imageDOM.style.zIndex = "-1";
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = "1";
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = "100";
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = "0";
      imageDOM.style.zIndex = "99";
    }
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames={{
        enter: styles.fadeEnter,
        appear: styles.fadeAppear,
        enterActive: styles.fadeEnterActive,
        appearActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive,
      }}
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <div
        className={styles.Container}
        style={{ bottom: playList.length ? "60px" : "0px" }}
      >
        {loading ? (
          <div className={styles.Loading}>
            <Loading />
          </div>
        ) : null}
        <Header
          title={artist.name}
          handleClick={setShowStatusFalse}
          ref={header}
        />
        <div
          className={styles.ImgWrapper}
          ref={imageWrapper}
          style={{ backgroundImage: `url(${artist.picUrl})` }}
        >
          <div className={styles.filter}></div>
        </div>

        <div className={styles.CollectButton} ref={collectButton}>
          <span>
            <MyIcon type="iconshoucang" className={styles.iconfont} />
          </span>
          <span className={styles.text}> 收藏 </span>
        </div>

        <div className={styles.BgLayer} ref={layer}></div>

        <div className={styles.SongListWrapper} ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <div>
              {!isEmptyObject(songsOfArtist) ? (
                <SongsList
                  songs={songsOfArtist}
                  showCollect={false}
                  musicAnimation={musicAnimation}
                />
              ) : null}
            </div>
          </Scroll>
        </div>
        <MusicNote ref={musicNoteRef}></MusicNote>
      </div>
    </CSSTransition>
  );
}

export default withRouter(memo(Singer));
