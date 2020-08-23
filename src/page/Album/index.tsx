/*
 * @Author: Shabby申
 * @Date: 2020-08-21 13:01:42
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-23 23:24:00
 * 具体歌单页面
 */
import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { MyIcon } from "../../utils/request";
import { HEADER_HEIGHT, isEmptyObject } from "../../utils/utils";
import { RootState } from "../../store";
import * as actionTypes from "./store/action";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading1";
import Header from "../../components/Header";
import SongsList from "../../components/SongList";
import MusicNote from "../../components/MusicNote";
import styles from "./style.less";

function Alibum(props: any) {
  const dispatch = useDispatch();
  const { currentAlbum, enterLoading, playList } = useSelector(
    (state: RootState) => ({
      currentAlbum: state.album.currentAlbum,
      enterLoading: state.album.enterLoading,
      playList: state.player.playList,
    })
  );

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headerEl = useRef<HTMLElement>(null);

  // 从路由中获取 id
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(actionTypes.changeEnterLoading(true));
    dispatch(actionTypes.getAlbumList(id));
  }, [id]);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos: any) => {
      let minScroll = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScroll);
      let headerDom = headerEl.current!;
      if (pos.y < minScroll) {
        headerDom.style.backgroundColor = "#d44439";
        headerDom.style.opacity = String(Math.min(1, (percent - 1) / 2));
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = "1";
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  const musicNoteRef = useRef<any>(null);
  const musicAnimation = (x: number, y: number) => {
    musicNoteRef.current!.startAnimation({ x, y });
  };

  const renderTopDesc = () => (
    <div className={styles.TopDesc}>
      <div
        className={styles.background}
        style={{
          backgroundImage: currentAlbum.coverImgUrl,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.filter}></div>
      </div>
      <div className={styles.img_wrapper}>
        <div className={styles.decorate}></div>
        <img src={currentAlbum.coverImgUrl} alt="img" />
        <div className={styles.play_count}>
          <MyIcon type="iconerji" className={styles.play} />
          <span className={styles.count}>
            {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万
          </span>
        </div>
      </div>
      <div className={styles.desc_wrapper}>
        <div className={styles.title}>{currentAlbum.name}</div>
        <div className={styles.person}>
          <div className={styles.avatar}>
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className={styles.name}>{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className={styles.Menu}>
      <div>
        <MyIcon type="iconpinglun" className={styles.iconfont} />
        评论
      </div>
      <div>
        <MyIcon type="icondianzan" className={styles.iconfont} />
        点赞
      </div>
      <div>
        <MyIcon type="iconshoucang" className={styles.iconfont} />
        收藏
      </div>
      <div>
        <MyIcon type="icongengduo" className={styles.iconfont} />
        更多
      </div>
    </div>
  );

  return (
    <CSSTransition
      in={showStatus} //值改变会触发动画
      timeout={300} //动画执行多久
      classNames={{
        enter: styles.fadeEnter,
        appear: styles.fadeAppear,
        enterActive: styles.fadeEnterActive,
        appearActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive,
      }}
      appear={true} //第一次显示需要动画
      unmountOnExit //dom会被移除
      // 退出动画执行结束时跳转路由。
      onExited={props.history.goBack}
    >
      <div
        className={styles.Container}
        style={{ bottom: playList.length ? "60px" : "0px" }}
      >
        {enterLoading ? <Loading></Loading> : null}
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
                musicAnimation={musicAnimation}
              />
            </div>
          </Scroll>
        ) : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </div>
    </CSSTransition>
  );
}

export default withRouter(memo(Alibum));
