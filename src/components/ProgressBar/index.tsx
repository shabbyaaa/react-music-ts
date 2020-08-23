import React, { memo, useRef, useEffect, useState } from "react";
import { prefixStyle } from "../../utils/utils";
import styles from "./style.less";

function ProgressBar(props: any) {
  const { percentChange, percent } = props;

  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const progressBtn = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState<any>({});

  const progressBtnWidth = 8;

  const _changePercent = () => {
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const curPercent = progress.current!.clientWidth / barWidth; // 新的进度计算
    percentChange(curPercent); // 把新的进度传给回调函数并执行
  };

  const progressClick = (e: any) => {
    const rect = progressBar.current!.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  // 处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`;
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressTouchStart = (e: React.TouchEvent) => {
    const startTouch: any = {};
    startTouch.initiated = true; //initial 为 true 表示滑动动作开始了
    startTouch.startX = e.touches[0].pageX; // 滑动开始时横向坐标
    startTouch.left = progress.current!.clientWidth; // 当前 progress 长度
    setTouch(startTouch);
  };

  const progressTouchMove = (e: React.TouchEvent) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = (e: React.TouchEvent) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  };

  const transform: any = prefixStyle("transform");
  //监听 percent
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current!.style.width = `${offsetWidth}px`;
      progressBtn.current!.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  return (
    <div className={styles.ProgressBarWrapper}>
      <div
        className={styles.barInner}
        ref={progressBar}
        onClick={progressClick}
      >
        <div className={styles.progress} ref={progress}></div>
        <div
          className={styles.progressBtnWrapper}
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className={styles.progressBtn}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProgressBar);
