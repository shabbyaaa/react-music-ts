/*
 * @Author: Shabby申
 * @Date: 2020-08-19 14:54:41
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-21 23:19:54
 * 歌手分类组件
 */
import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import { withRouter } from "react-router-dom";
import { categoryTypes, alphaTypes } from "../../assets/static";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading2";
import Horizen from "./component/HorizonItem";
import LocalStore from "../../utils/LocalStore";
import * as actionTypes from "./store/action";
import { RootState } from "../../store";
import styles from "./style.less";

function Singers(props: any) {
  const dispatch = useDispatch();
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = useSelector((state: RootState) => ({
    singerList: state.singers.singerList,
    enterLoading: state.singers.enterLoading,
    pullUpLoading: state.singers.pullUpLoading,
    pullDownLoading: state.singers.pullDownLoading,
    pageCount: state.singers.pageCount,
  }));

  // 使用localstorage缓存分类
  let [category, setCategory] = useState(LocalStore.get("category") || "");
  let [alpha, setAlpha] = useState(LocalStore.get("alpha") || "");

  let handleUpdateCatetory = (val: string) => {
    setCategory(val);
    LocalStore.set("category", val);
    updateDispatch(val, alpha);
  };

  let handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    LocalStore.set("alpha", val);
    updateDispatch(category, val);
  };

  useEffect(() => {
    // 下次进来如果有缓存的分类，请求对应的
    if (category !== "" || alpha !== "") {
      dispatch(actionTypes.getSingerList(category, alpha));
    } else if (!singerList.length) {
      dispatch(actionTypes.getHotSingerList());
    }
  }, []);

  // 点击具体分类的处理
  const updateDispatch = (category: string, alpha: string) => {
    dispatch(actionTypes.changePageCount(0)); //由于改变了分类，所以pageCount清零
    dispatch(actionTypes.changeEnterLoading(true));
    dispatch(actionTypes.getSingerList(category, alpha));
  };

  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (
    category: string,
    alpha: string,
    hot: boolean,
    count: number
  ) => {
    dispatch(actionTypes.changePullUpLoading(true));
    dispatch(actionTypes.changePageCount(count + 5));
    if (hot) {
      // 第一次上面加的count+5 在页面中还是上一次的0 因此给下面初始值加个5
      dispatch(actionTypes.refreshMoreHotSingerList(pageCount + 5));
    } else {
      dispatch(
        actionTypes.refreshMoreSingerList(category, alpha, pageCount + 5)
      );
    }
  };

  //顶部下拉刷新
  const pullDownRefreshDispatch = (category: string, alpha: string) => {
    dispatch(actionTypes.changePullDownLoading(true));
    dispatch(actionTypes.changePageCount(0)); //属于重新获取数据
    if (category === "" && alpha === "") {
      dispatch(actionTypes.getHotSingerList());
    } else {
      dispatch(actionTypes.getSingerList(category, alpha));
    }
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const enterDetail = (id: number) => {
    props.history.push(`/singers/${id}`);
  };

  const renderSingerList = () => {
    return (
      <div className={styles.list}>
        {singerList.map((item: any) => {
          return (
            <div
              className={styles.listItem}
              key={item.id}
              onClick={() => enterDetail(item.id)}
            >
              <div className={styles.img_wrapper}>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("../../assets/img/singer.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className={styles.name}>{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={styles.navContainer}>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={handleUpdateCatetory}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </div>
      <div className={styles.listContainer}>
        {enterLoading ? <Loading /> : null}
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </div>
      {props.children}
    </>
  );
}

export default withRouter(memo(Singers));
