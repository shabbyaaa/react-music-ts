import React, { memo, useState } from "react";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Header from "./components/Header";
import styles from "./style.less";

function Alibum(props: any) {
  const [showStatus, setShowStatus] = useState(true);
  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus} //值改变会触发动画
      timeout={300} //动画执行多久
      classNames={{
        enter: styles.fadeEnter,
        appear: styles.fadeAppear,
        enterActive: styles.fadeEnterActive,
        appearActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive,
      }}
      appear={true} //第一次显示需要动画
      unmountOnExit //dom会被移除
      // 退出动画执行结束时跳转路由。
      onExited={props.history.goBack}
    >
      <div className={styles.Container}>
        <Header title="返回" handleClick={handleBack}></Header>
      </div>
    </CSSTransition>
  );
}

export default withRouter(memo(Alibum));
