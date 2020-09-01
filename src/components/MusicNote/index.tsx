/*
 * @Author: Shabby申
 * @Date: 2020-08-24 10:38:28
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-09-01 09:27:23
 * 音乐符号下落动画组件
 */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { prefixStyle } from "../../utils/utils";
import "./iconfont.css";

const MusicNote = forwardRef((props, ref) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  const ICON_NUMBER = 1;

  const transform: any = prefixStyle("transform");

  const createNode = (txt: string) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement("div");
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  useEffect(() => {
    const nodeRef = iconsRef.current!;
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(
        `<div style="font-size: 16px;"><svg t="1598365471654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5852" width="16" height="16"><path d="M955.706024 173.758561C955.706024 117.31078 909.784195 71.387065 853.336331 71.387065L850.762519 71.387065 363.228368 160.029949C308.062521 161.510477 263.634912 206.846478 263.634912 262.364285L263.634912 729.760973C242.354016 715.042735 216.571882 706.392312 188.795824 706.392312 116.06214 706.392312 56.888889 765.563518 56.888889 838.29905 56.888889 911.034582 116.062139 970.205788 188.795824 970.205788 261.529509 970.205788 320.702759 911.034582 320.702759 838.29905L320.702759 272.144174C320.702759 234.525685 368.578418 217.06153 368.578418 217.06153L855.601129 128.511545C879.534069 129.69577 898.639152 149.537178 898.639152 173.759539L898.639152 626.389094C877.359235 611.670858 851.576124 603.020433 823.800067 603.020433 751.065404 603.020433 691.893131 662.191639 691.893131 734.927171 691.893131 807.662703 751.064425 866.833909 823.800067 866.833909 896.535706 866.833909 955.706024 807.660747 955.706024 734.926193L955.706024 173.758561 955.706024 173.758561Z" fill="#d44439" p-id="5853"></path></svg></div>`
      )!;
      nodeRef.appendChild(node);
    }
    let domArray = [].slice.call(nodeRef.children);
    domArray.forEach((item: HTMLDivElement) => {
      item.setAttribute("running", "false");
      item.addEventListener(
        "transitionend",
        function () {
          this.style.display = "none";
          this.style[transform] = `translate3d(0, 0, 0)`;
          this.setAttribute("running", "false");
          let icon = this.querySelector("div")!;
          icon.style[transform] = `translate3d(0, 0, 0)`;
        },
        false
      );
    });
    // eslint-disable-next-line
  }, []);

  const startAnimation = ({ x, y }: any) => {
    const nodeRef = iconsRef.current!;
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [].slice.call(nodeRef.children);
      let item: HTMLDivElement = domArray[i];
      // 选择一个空闲的元素来开始动画
      if (item.getAttribute("running") === "false") {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";
        setTimeout(() => {
          item.setAttribute("running", "true");
          item.style[transform] = `translate3d(-40px, 750px, 0)`;
          let icon = item.querySelector("div")!;
          icon.style[transform] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return <div className="Container" ref={iconsRef}></div>;
});

export default React.memo(MusicNote);
