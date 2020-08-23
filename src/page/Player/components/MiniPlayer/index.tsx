import React, { memo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { getName } from "../../../../utils/utils";
import { MyIcon } from "../../../../utils/request";
import ProgressCircle from "../../../../components/ProgressCircle";
import styles from "./style.less";

function MiniPlayer(props: any) {
  const {
    song,
    fullScreen,
    toggleFullScreen,
    playing,
    percent,
    clickPlaying,
    setFullScreen,
    togglePlayList,
  } = props;

  const miniPlayerRef = useRef<HTMLDivElement | null>(null);

  const handleTogglePlayList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    togglePlayList(true);
    e.stopPropagation();
  };

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames={{
        enter: styles.miniEnter,
        enterActive: styles.miniEnterActive,
        exitActive: styles.miniExitActive,
      }}
      onEnter={() => {
        miniPlayerRef.current!.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current!.style.display = "none";
      }}
    >
      <div
        className={styles.MiniPlayerContainer}
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className={styles.icon}>
          <div className={styles.imgWrapper}>
            <img
              className={`${styles.play} ${playing ? "" : styles.pause}`}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className={styles.text}>
          <h2 className={styles.name}>{song.name}</h2>
          <p className={styles.desc}>{getName(song.ar)}</p>
        </div>
        <div className={styles.control}>
          <ProgressCircle radius={32} percent={percent}>
            <span>
              {playing ? (
                <MyIcon
                  type="iconbofang"
                  className={`${styles.iconMini} ${styles.iconfont} ${styles.iconPause}`}
                  onClick={(e) => clickPlaying(e, false)}
                />
              ) : (
                <MyIcon
                  type="iconzanting"
                  className={`${styles.iconMini} ${styles.iconfont} ${styles.iconPause}`}
                  onClick={(e) => clickPlaying(e, true)}
                />
              )}
            </span>
          </ProgressCircle>
        </div>
        <div className={styles.control} onClick={handleTogglePlayList}>
          <MyIcon type="iconyinleliebiao-" className={styles.iconfont} />
        </div>
      </div>
    </CSSTransition>
  );
}

export default memo(MiniPlayer);
