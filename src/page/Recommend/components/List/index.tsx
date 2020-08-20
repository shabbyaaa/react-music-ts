import React from "react";
import LazyLoad from "react-lazyload";
import { MyIcon } from "../../../../utils/request";
import { getCount } from "../../../../utils/utils";
import styles from "./style.less";

function List(props: any) {

  return (
    <div className={styles.ListWraper}>
      <h1 className={styles.title}>推荐歌单</h1>
      <div className={styles.list}>
        {props.recommendList.map((item: any) => {
          return (
            <div
              className={styles.listItem}
              key={item.id}
              onClick={() => props.enterDetail(item.id)}
            >
              <div className={styles.img_wrapper}>
                <div className={styles.decorate}></div>
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
                  <MyIcon className={styles.iconfont} type="iconerji" />
                  <span className={styles.count}>
                    {getCount(item.playCount)}
                  </span>
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
