import React from "react";
import styles from "./style.less";

function PlayList(props: any) {
  return (
    <div className={styles.PlayListWrapper}>
      <div className={styles.list_wrapper}>
        <div className={styles.ScrollWrapper}></div>
      </div>
    </div>
  );
}
export default PlayList;
