/*
 * @Author: Shabby申
 * @Date: 2020-08-31 16:29:58
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-31 17:24:55
 * @params playList 根据播放列表的长度判断页面底部迷你播放器是否出现
 */
import React, { useEffect, memo, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";
import { withRouter } from "react-router-dom";
import { RouteConfigComponentProps } from "react-router-config";
import Scroll from "@components/Scroll";
import Loading from "@components/Loading1";
import { RootState } from "@/store";
import List from "./components/List";
import Slider from "./components/Slider";
import * as actionTypes from "./store/action";
import styles from "./style.less";

interface IRecommendProps {
  children?: ReactNode;
  history: RouteConfigComponentProps["history"];
}

const Recommend = (props: IRecommendProps) => {
  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading, playList } = useSelector(
    (state: RootState) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
      enterLoading: state.recommend.enterLoading,
      playList: state.player.playList,
    })
  );

  const getBannerDataDispatch = () => {
    dispatch(actionTypes.getBannerList());
  };

  const getRecommendListDataDispatch = () => {
    dispatch(actionTypes.getRecommendList());
  };

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = (id: number) => {
    props.history.push(`/recommend/${id}`);
  };
  return (
    // scroll 滑动原理 父组件content容器大小必须固定 ，当子元素超过父容器，通过transform动画产生滑动效果
    <>
      <div
        className={styles.content}
        style={{ bottom: playList.length ? "60px" : "0px" }}
      >
        <Scroll onScroll={forceCheck}>
          {/* scroll组件只能让第一个子元素滑动，因此加一个div包裹 */}
          <div>
            <Slider bannerList={bannerList} />
            <List enterDetail={enterDetail} recommendList={recommendList} />
          </div>
        </Scroll>
        {enterLoading ? <Loading /> : null}
      </div>
      {props.children}
    </>
  );
};

export default withRouter(memo(Recommend));
