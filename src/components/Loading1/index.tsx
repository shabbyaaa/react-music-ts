import React from "react";
import styles from "./style.less";

function Loading() {
  return (
    <div className={styles.LoadingWrapper}>
      <div></div>
      <div></div>
    </div>
  );
}

export default React.memo(Loading);
