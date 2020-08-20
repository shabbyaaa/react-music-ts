import React, { forwardRef, memo } from "react";
import styles from "./style.less";
import { MyIcon } from "../../../../utils/request";

interface HeaderProps {
  handleClick: () => void;
  title: string;
  // isMarquee: boolean;
}

const Header = forwardRef((props: HeaderProps, ref) => {
  const { handleClick, title } = props;
  return (
    <div className={styles.HeaderContainer} ref={ref as any}>
      <MyIcon
        type="iconfanhui"
        className={styles.back}
        onClick={handleClick}
      ></MyIcon>
      <h1>{title}</h1>
    </div>
  );
});

export default memo(Header);
