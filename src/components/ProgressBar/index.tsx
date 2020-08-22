import React, { memo } from "react";
import styles from "./style.less";

function ProgressBar() {
  return (
    <div className={styles.ProgressBarWrapper}>
      <div className={styles.barInner}>
        <div className={styles.progress}></div>
        <div className={styles.progressBtnWrapper}>
          <div className={styles.progressBtn}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProgressBar);
