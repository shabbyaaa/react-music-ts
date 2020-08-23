/*
 * @Author: Shabby申
 * @Date: 2020-08-23 18:44:39
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-23 18:51:22
 * 播放模式的文字提示
 */
import React, {
  ReactElement,
  memo,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./style.less";

const Toast = forwardRef((props: any, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<any>("");
  const { text } = props;
  //外面组件拿函数组件ref的方法，用useImperativeHandle这个hook
  useImperativeHandle(ref, () => ({
    show() {
      // 做了防抖处理
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(
        setTimeout(() => {
          setShow(false);
        }, 3000)
      );
    },
  }));
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: styles.dropEnter,
        enterActive: styles.dropEnterActive,
        exitActive: styles.dropExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.ToastWrapper}>
        <div className={styles.text}>{text}</div>
      </div>
    </CSSTransition>
  );
});

export default React.memo(Toast);
