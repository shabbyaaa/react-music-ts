/*
 * @Author: Shabby申
 * @Date: 2020-08-20 18:10:09
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-20 18:12:33
 * 排行榜页面
 */
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import * as actionTypes from "./store/action";
import Scroll from "../../components/Scroll";
import styles from "./style.less";

// tracks 有数组代表是官方榜 找到最后一个含有tracks的索引
function filterIndex(rankList: any) {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

function Rank(props: any) {
  const dispatch = useDispatch();

  const { rankList, loading } = useSelector((state: RootState) => ({
    rankList: state.rank.rankList,
    loading: state.rank.loading,
  }));

  useEffect(() => {
    dispatch(actionTypes.getRankList());
  }, []);

  const enterDetail = (detail: any) => {
    props.history.push(`/rank/${detail.id}`);
  };

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderRankList = (list: any, global?: boolean) => {
    return (
      <ul className={styles.List} style={{ display: global ? "flex" : "" }}>
        {list.map((item: any) => {
          return (
            <li
              className={styles.ListItem}
              key={item.id}
              style={{ display: item.tracks.length ? "flex" : "" }}
              onClick={() => enterDetail(item)}
            >
              <div
                className={styles.img_wrapper}
                style={{
                  width: item.tracks.length ? "27vw" : "32vw",
                  height: item.tracks.length ? "27vw" : "32vw",
                }}
              >
                <img src={item.coverImgUrl} alt="封面图片" />
                <div className={styles.decorate}></div>
                <span className={styles.update_frequecy}>
                  {item.updateFrequency}
                </span>
              </div>
              {renderSongList(item.tracks)}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSongList = (list: any) => {
    return list.length ? (
      <ul className={styles.SongList}>
        {list.map((item: any, index: number) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  return (
    <>
      <div className={styles.Container}>
        <Scroll>
          <div>
            <h1
              className={styles.offical}
              style={{ display: loading ? "none" : "" }}
            >
              官方榜
            </h1>
            {renderRankList(officialList)}
            <h1
              className={styles.global}
              style={{ display: loading ? "none" : "" }}
            >
              全球榜
            </h1>
            {renderRankList(globalList, true)}
          </div>
        </Scroll>
      </div>
      {props.children}
    </>
  );
}

export default withRouter(React.memo(Rank));
