/*
 * @Author: Shabby申
 * @Date: 2020-08-19 14:54:41
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-19 18:24:06
 */
import React, { useState } from "react";
import { categoryTypes, alphaTypes } from "../../assets/static";
import Scroll from "../../components/Scroll";
import Horizen from "./component/HorizonItem";
import styles from "./style.less";

function Singers() {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");

  let handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };

  let handleUpdateCatetory = (val: string) => {
    setCategory(val);
  };

  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
    return {
      picUrl:
        "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "隔壁老樊",
      accountId: 277313426,
    };
  });

  const renderSingerList = () => {
    return (
      <div className={styles.list}>
        {singerList.map((item, index) => {
          return (
            <div className={styles.listItem} key={item.accountId + "" + index}>
              <div className={styles.img_wrapper}>
                <img
                  src={`${item.picUrl}?param=300x300`}
                  // width="100%"
                  // height="100%"
                  alt="music"
                />
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
        <Scroll>
          <div className={styles.list}>
            {singerList.map((item, index) => (
              <div className={styles.listItem} key={index}>
                <div className={styles.img_wrapper}>
                  <img src={`${item.picUrl}?param=300x300`} />
                </div>
                <span className={styles.name}>{item.name}</span>
              </div>
            ))}
          </div>
        </Scroll>
      </div>
    </>
  );
}

export default React.memo(Singers);
