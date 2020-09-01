/*
 * @Author: Shabby申
 * @Date: 2020-08-21 20:35:46
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-09-01 09:39:32
 * 歌曲列表
 */
import React, { forwardRef, memo } from "react";
import { useDispatch } from "react-redux";
import { getName, getCount } from "@utils/utils";
import { MyIcon } from "@utils/request";
import * as actionTypes from "@page/Player/store/action";
import styles from "./style.less";

const SongsList = forwardRef((props: any, refs) => {
  const dispatch = useDispatch();

  // 接受触发动画的函数 => musicAnimation
  const { musicAnimation, showBackground } = props;

  const selectItem = (e: any, index: number) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };

  const changePlayListDispatch = (data: any) => {
    dispatch(actionTypes.changePlayList(data));
  };
  const changeCurrentIndexDispatch = (data: number) => {
    dispatch(actionTypes.changeCurrentIndex(data));
  };
  const changeSequecePlayListDispatch = (data: any) => {
    dispatch(actionTypes.changeSequecePlayList(data));
  };

  const { collectCount, showCollect, songs } = props;

  const totalCount = songs.length;

  let songList = (list: any) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className={styles.index}>{i + 1}</span>
          <div className={styles.info}>
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };

  const collect = (count: number) => {
    return (
      <div className={styles.add_list}>
        <span>
          <MyIcon type="iconshoucang" className={styles.iconfont} />
        </span>
        <span> 收藏 ({getCount(count)})</span>
      </div>
    );
  };
  return (
    <div
      className={styles.SongList}
      ref={refs as any}
      style={{ background: showBackground ? "#fff" : "" }}
    >
      <div className={styles.first_line}>
        <div className={styles.play_all} onClick={(e) => selectItem(e, 0)}>
          <span>
            <MyIcon type="iconbofang" className={styles.iconfont} />
          </span>
          <span>
            播放全部 <span className={styles.sum}>(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <ul className={styles.SongItem}>{songList(songs)}</ul>
    </div>
  );
});

export default memo(SongsList);
