/*
 * @Author: Shabby申
 * @Date: 2020-05-18 20:41:04
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-19 22:47:20
 * @Description: 滑动组件
 * 滑动组件 需要一个父容器包裹，第一个子元素高度超过父容器，就会滑动
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  ReactNode,
} from "react";
import BScroll from "better-scroll";
import { debounce, noop } from "lodash";
import Loading1 from "../../components/Loading1";
import Loading2 from "../../components/Loading2";
import styles from "./style.less";

interface ScrollProps {
  direction?: "vertical" | "horizontal"; //滚动的方向
  click?: boolean; //是否支持点击
  refresh?: boolean; //是否刷新
  onScroll?: Function; //滑动触发的回调函数
  pullUp?: () => void; //上拉加载逻辑
  pullDown?: () => void; //下拉加载逻辑
  pullUpLoading?: boolean; //是否显示上拉loading效果
  pullDownLoading?: boolean; //是否显示下拉loading效果
  bounceTop?: boolean; //是否支持向上吸顶
  bounceBottom?: boolean; //是否支持向下吸顶
  children: ReactNode;
}

const Scroll = forwardRef((props: ScrollProps, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>(null);

  const scrollContaninerRef = useRef<HTMLDivElement | null>(null);

  const {
    direction = "vertical",
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true,
  } = props;

  const { pullUp = noop, pullDown = noop, onScroll } = props;

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500);
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current!, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => onScroll(scroll));
    return () => {
      bScroll.off("scroll", () => onScroll);
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handlePullUp);
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos: any) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  // 每次重新渲染都要刷新实例 防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 使得 Scroll 的父组件可以调用  ref.current.refresh & getBScroll
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  return (
    <div className={styles.scrollContainer} ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <div
        className={styles.PullUpLoading}
        style={{ display: pullUpLoading ? "" : "none" }}
      >
        <Loading1></Loading1>
      </div>
      {/* 顶部下拉刷新动画 */}
      <div
        className={styles.PullDownLoading}
        style={{ display: pullDownLoading ? "" : "none" }}
      >
        <Loading2></Loading2>
      </div>
    </div>
  );
});

export default React.memo(Scroll);
