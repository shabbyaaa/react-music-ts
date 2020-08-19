import React, { useState, useRef, useEffect, memo } from "react";
import Scroll from "../../../../components/Scroll";
import styles from "./style.less";

interface listType {
  key: string;
  name: string;
}

interface IProps {
  list: listType[]; //分类数组
  oldVal: string; //判断选中样式
  title: string; //分类和首字母
  handleClick: (key: string) => void; //点击事件
}

const HorizonItem: React.FC<IProps> = (props) => {
  const { list, oldVal, title, handleClick } = props;

  const Category = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categoryDOM = Category.current!;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  });

  return (
    <Scroll direction={"horizontal"}>
      {/* Category 计算Scroll子组件的宽度 超过父组件好滑动 */}
      <div ref={Category}>
        <div className={styles.list}>
          <span>{title}</span>
          {list.map((item) => (
            <span
              // className={`listItem ${oldVal === item.key ? "selected" : ""}`}
              className={`${styles.listItem} ${
                oldVal === item.key ? styles.selected : ""
              }`}
              key={item.key}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </Scroll>
  );
};

export default memo(HorizonItem);
