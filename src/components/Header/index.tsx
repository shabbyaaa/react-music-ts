/*
 * @Author: Shabby申
 * @Date: 2020-08-21 20:13:33
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-21 20:15:55
 * 歌手详细和歌单详细排行榜的通用头部  包含返回上回路由的点击事件和跑马灯
 */
import React, { forwardRef, memo } from "react";
import styles from "./style.less";
import { MyIcon } from "../../utils/request";

interface HeaderProps {
  handleClick?: () => void;
  title?: string;
  isMarquee?: boolean;
}

const Header = forwardRef((props: HeaderProps, ref) => {
  const { handleClick, title, isMarquee } = props;

  return (
    <div className={styles.HeaderContainer} ref={ref as any}>
      <span>
        <MyIcon
          type="iconfanhui"
          className={styles.back}
          onClick={handleClick}
        ></MyIcon>
      </span>
      {isMarquee ? (
        <div className={styles.Marquee}>
          <h1 className={styles.text}>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
});

export default memo(Header);
