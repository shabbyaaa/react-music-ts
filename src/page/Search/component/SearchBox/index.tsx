import React, { useRef, useState, useEffect, useMemo } from "react";
import { debounce, noop } from "lodash";
import { MyIcon } from "../../../../utils/request";
import styles from "./style.less";

const SearchBox = (props: any) => {
  const queryRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  // 清空框内容的逻辑
  const clearQuery = () => {
    setQuery("");
    queryRef.current!.focus();
  };

  // 进场出现光标:
  useEffect(() => {
    queryRef.current!.focus();
  }, []);

  // 监听 input 框的内容
  const handleChange = (e: any) => {
    setQuery(e.currentTarget.value);
  };

  // 缓存方法
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);

  return (
    <div className={styles.SearchBoxWrapper}>
      <span>
        <MyIcon
          type="iconfanhui"
          className={styles.iconBack}
          onClick={() => props.back()}
        />
      </span>
      <input
        ref={queryRef}
        className={styles.box}
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <span style={displayStyle}>
        <MyIcon
          type="iconchahao"
          className={`${styles.iconfont} ${styles.iconDelete}`}
          onClick={clearQuery}
        />
      </span>
    </div>
  );
};

export default SearchBox;
