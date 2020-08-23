import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { prefixStyle } from "../../utils/utils";
import { MyIcon } from "../../utils/request";
import styles from "./style.less";

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
        `<div>${<MyIcon type="iconiconfontyuleyinle" />}</div>`
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

  return <div className={styles.Container} ref={iconsRef}></div>;
});

export default React.memo(MusicNote);
