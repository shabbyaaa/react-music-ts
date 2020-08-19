import React from "react";
import styles from "./style.less";

function LoadingV2() {
  return (
    <div className={styles.Loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </div>
  );
}

export default React.memo(LoadingV2);
