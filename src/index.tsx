import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
// import FastClick from "fastclick";
import { Provider } from "react-redux";
import { Store } from "./store";
import RouterConfig from "./route";
import ErrorBoundary from "./ErrorBoundary";
import "antd/dist/antd.css";
import "./global.less";

// 解决移动端300ms延迟（移动端的双击会缩放导致click判断延迟）
// 更改默认视口宽度 content="width=device-width" 或者 禁用缩放 content="user-scalable=no" 都可以解决
// fastclick ts版本的导出有问题
// FastClick.attach(document.body);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={Store}>
      <RouterConfig />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
