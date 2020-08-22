/*
 * @Author: Shabby申 
 * @Date: 2020-08-22 22:44:34 
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-22 22:45:06
 * 原型进度条组件 利用 svg
 */
import React, { memo } from "react";
import styles from "./style.less";

function ProgressCircle(props: any) {
  const { radius, percent } = props;
  // 整个背景的周长
  const dashArray = Math.PI * 100;
  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;
  return (
    <div className={styles.CircleWrapper}>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.progressBackground}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className={styles.progressBar}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {props.children}
    </div>
  );
}

export default memo(ProgressCircle);
