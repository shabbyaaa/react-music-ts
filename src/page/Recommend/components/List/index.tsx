import React from "react";
import LazyLoad from "react-lazyload";
import { MyIcon } from "@utils/request";
import { getCount } from "@utils/utils";
import { IRcommendList, IRecommendType } from "../../store/reducer";
import styles from "./style.less";

interface IListProps {
  enterDetail: Function;
  recommendList: IRcommendList;
}

function List({ recommendList, enterDetail }: IListProps) {
  return (
    <div className={styles.ListWraper}>
      <h1 className={styles.title}>推荐歌单</h1>
      <div className={styles.list}>
        {recommendList.map((item: IRecommendType) => {
          return (
            <div
              className={styles.listItem}
              key={item.id}
              onClick={() => enterDetail(item.id)}
            >
              <div className={styles.img_wrapper}>

                {/* 给图片上方加一个遮罩 防止白色字体在白色背景下不显示 */}
                <div className={styles.decorate}></div>

                {/* LazyLoad 图片懒加载插件 */}
                <LazyLoad
                  placeholder={
                    <img
                      src={require("../../../../assets/img/music.png")}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>

                <div className={styles.play_count}>
                  <span>
                    <MyIcon className={styles.iconfont} type="iconerji" />
                  </span>
                  {getCount(item.playCount)}
                </div>
              </div>
              <div className={styles.desc}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(List);
