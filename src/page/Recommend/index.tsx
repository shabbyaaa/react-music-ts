import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";
import Slider from "../../components/Slider";
import List from "../../components/List";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading1";
import * as actionTypes from "./store/action";
import { RootState } from "../../store";
import styles from "./style.less";

const Recommend = () => {
  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading } = useSelector(
    (state: RootState) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
      enterLoading: state.recommend.enterLoading,
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
  return (
    // scroll 滑动原理 父组件content容器大小必须固定 ，当子元素超过父容器，通过transform动画产生滑动效果
    <div className={styles.content}>
      <Scroll onScroll={forceCheck}>
        {/* scroll组件只能让第一个子元素滑动，因此加一个div包裹 */}
        <div>
          <Slider bannerList={bannerList} />
          <List recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
    </div>
  );
};

export default memo(Recommend);
