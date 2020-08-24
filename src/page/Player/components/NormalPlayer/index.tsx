import React, { memo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import {
  getName,
  prefixStyle,
  formatPlayTime,
  playMode,
} from "../../../../utils/utils";
import { MyIcon } from "../../../../utils/request";
import ProgressBar from "../../../../components/ProgressBar";
import styles from "./style.less";

function NormalPlayer(props: any) {
  const {
    song,
    fullScreen,
    playing,
    percent,
    duration,
    currentTime,
    toggleFullScreen,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    mode,
    changeMode,
    togglePlayList,
  } = props;

  const normalPlayerRef = useRef<HTMLDivElement>(null);
  const cdWrapperRef = useRef<HTMLDivElement>(null);

  // 启用帧动画
  const enter = () => {
    normalPlayerRef.current!.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current!;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  // 处理 transform 兼容问题 加前缀
  const transform: any = prefixStyle("transform");

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current!.style.display = "none";
  };

  return (
    <CSSTransition
      classNames={{
        enter: styles.normalEnter,
        exitDone: styles.normalExitDone,
        enterActive: styles.normalEnterActive,
        exitActive: styles.normalExitActive,
      }}
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className={styles.NormalPlayerContainer} ref={normalPlayerRef}>
        <div className={styles.background}>
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className={`${styles.background} ${styles.layer}`}></div>

        <div className={styles.Top}>
          <div className={styles.back} onClick={() => toggleFullScreen(false)}>
            <span>
              <MyIcon type="icondown1" className={styles.iconfont} />
            </span>
          </div>
          <h1 className={styles.title}>{song.name}</h1>
          <h1 className={styles.subtitle}>{getName(song.ar)}</h1>
        </div>

        <div className={styles.Middle} ref={cdWrapperRef}>
          <div className={styles.CDWrapper}>
            <div className={styles.cd}>
              <img
                className={`${styles.image} ${styles.play} ${
                  playing ? "" : styles.pause
                }`}
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className={styles.Bottom}>
          {/* 播放进度 */}
          <div className={styles.ProgressWrapper}>
            <span className={`${styles.time} ${styles.timeL}`}>
              {formatPlayTime(currentTime)}
            </span>
            <div className={styles.progressBarWrapper}>
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <div className={`${styles.time} ${styles.timeR}`}>
              {formatPlayTime(duration)}
            </div>
          </div>

          <div className={styles.Operators}>
            <div
              onClick={changeMode}
              className={`${styles.icon} ${styles.iLeft}`}
            >
              {mode === playMode.sequence ? (
                <span>
                  <MyIcon type="iconshunxu" className={styles.iconfont} />
                </span>
              ) : mode === playMode.loop ? (
                <span>
                  <MyIcon type="iconicon-xunhuan" className={styles.iconfont} />
                </span>
              ) : (
                <span>
                  <MyIcon type="iconsuiji" className={styles.iconfont} />
                </span>
              )}
            </div>
            <div
              onClick={handlePrev}
              className={`${styles.icon} ${styles.iLeft}`}
            >
              <span>
                <MyIcon
                  style={{ transform: "rotate(180deg)" }}
                  type="iconfirst-page"
                  className={styles.iconfont}
                />
              </span>
            </div>
            <div className={`${styles.icon} ${styles.iCenter}`}>
              <span>
                {playing ? (
                  <MyIcon
                    type="iconbofang"
                    className={styles.iconfont}
                    onClick={(e) => clickPlaying(e, false)}
                  />
                ) : (
                  <MyIcon
                    type="iconzanting"
                    className={styles.iconfont}
                    onClick={(e) => clickPlaying(e, true)}
                  />
                )}
              </span>
            </div>
            <div
              onClick={handleNext}
              className={`${styles.icon} ${styles.iRight}`}
            >
              <span>
                <MyIcon type="iconfirst-page" className={styles.iconfont} />
              </span>
            </div>
            <div
              className={`${styles.icon} ${styles.iRight}`}
              onClick={() => togglePlayList(true)}
            >
              <span>
                <MyIcon
                  type="iconyinleliebiao-copy"
                  className={styles.iconfont}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default memo(NormalPlayer);
