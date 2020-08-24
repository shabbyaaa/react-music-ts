import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Scroll from "../../components/Scroll";
import SearchBox from "./component/SearchBox";
import Loading from "../../components/Loading1";
import MusicalNote from "../../components/MusicNote";
import * as actionTypes from "./store/action";
import { getName } from "../../utils/utils";
import { RootState } from "../../store";
import { getSongDetail } from "../Player/store/action";
import styles from "./style.less";

function Search(props: any) {
  const dispatch = useDispatch();
  const {
    hotList,
    enterLoading,
    suggestList,
    songsList,
    songsCount,
  } = useSelector((state: RootState) => ({
    hotList: state.search.hotList,
    enterLoading: state.search.enterLoading,
    suggestList: state.search.suggestList,
    songsList: state.search.songsList,
    songsCount: state.player.playList,
  }));

  const musicNoteRef = useRef<any>();

  const [query, setQuery] = useState("");
  // 控制动画
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    setShow(true);
    if (!hotList.size) getHotKeyWordsDispatch();
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q: any) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  };

  const getHotKeyWordsDispatch = () => {
    dispatch(actionTypes.getHotKeyWords());
  };
  const changeEnterLoadingDispatch = (data: any) => {
    dispatch(actionTypes.changeEnterLoading(data));
  };
  const getSuggestListDispatch = (data: any) => {
    dispatch(actionTypes.getSuggestList(data));
  };

  const getSongDetailDispatch = (id: number) => {
    dispatch(getSongDetail(id));
  };

  const selectItem = (e: any, id: number) => {
    getSongDetailDispatch(id);
    musicNoteRef.current.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };

  const renderHotKey = () => {
    let list = hotList ? hotList : [];
    return (
      <ul>
        {list.map((item: any) => {
          return (
            <li
              className={styles.item}
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSingers = () => {
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <div className={styles.List}>
        <h1 className={styles.title}> 相关歌手 </h1>
        {singers.map((item: any, index: number) => {
          return (
            <div
              className={styles.ListItem}
              key={item.accountId + "" + index}
              onClick={() => props.history.push(`/singers/${item.id}`)}
            >
              <div className={styles.img_wrapper}>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("../../assets/img/music.png")}
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={item.picUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className={styles.name}> 歌手: {item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <div className={styles.List}>
        <h1 className={styles.title}> 相关歌单 </h1>
        {albums.map((item: any, index: number) => {
          return (
            <div
              className={styles.ListItem}
              key={item.accountId + "" + index}
              onClick={() => props.history.push(`/album/${item.id}`)}
            >
              <div className={styles.img_wrapper}>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("../../assets/img/music.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.coverImgUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className={styles.name}> 歌单: {item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderSongs = () => {
    return (
      <ul className={styles.SongItem} style={{ paddingLeft: "20px" }}>
        {songsList.map((item: any) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div className={styles.info}>
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames={{
        enter: styles.flyEnter,
        appear: styles.flyAppear,
        enterActive: styles.flyEnterActive,
        appearActive: styles.flyAppearActive,
        exit: styles.flyExit,
        exitActive: styles.flyExitActive,
      }}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <div
        className={styles.Container}
        style={{ bottom: songsCount > 0 ? "60px" : "0px" }}
      >
        <MusicalNote ref={musicNoteRef} />

        <SearchBox
          back={searchBack}
          newQuery={query}
          handleQuery={handleQuery}
        ></SearchBox>

        <div
          className={styles.ShortcutWrapper}
          style={{ display: !query ? "" : "none" }}
        >
          <Scroll>
            <div>
              <div className={styles.HotKey}>
                <h1 className={styles.title}> 热门搜索 </h1>
                {renderHotKey()}
              </div>
            </div>
          </Scroll>
        </div>
        {/* 下面为搜索结果 */}
        <div
          className={styles.ShortcutWrapper}
          style={{ display: !query ? "" : "none" }}
        >
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </div>
        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
}

export default withRouter(memo(Search));
