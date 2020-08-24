/*
 * @Author: Shabby申 
 * @Date: 2020-08-24 13:35:17 
 * @Last Modified by:   Shabby申 
 * @Last Modified time: 2020-08-24 13:35:17 
 * 确认弹窗组件
 */
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./style.less";

const Confirm = forwardRef((props: any, ref) => {
  const [show, setShow] = useState(false);
  const { text, cancelBtnText, confirmBtnText } = props;

  const { handleConfirm } = props;

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));
  // style={{display: show ? "block": "none"}}
  return (
    <CSSTransition
      classNames="confirm-fade"
      timeout={300}
      appear={true}
      in={show}
    >
      <div
        className={styles.ConfirmWrapper}
        style={{ display: show ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className={styles.confirm_content}>
            <p className={styles.text}>{text}</p>
            <div className={styles.operate}>
              <div
                className={`${styles.operate_btn} ${styles.left}`}
                onClick={() => setShow(false)}
              >
                {cancelBtnText}
              </div>
              <div
                className={styles.operate_btn}
                onClick={() => {
                  setShow(false);
                  handleConfirm();
                }}
              >
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default React.memo(Confirm);
