import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
// import FastClick from "fastclick";
import { Provider } from "react-redux";
import { Store } from "./store";
import RouterConfig from "./route";
import "antd/dist/antd.css";
import "./index.less";

// 解决移动端300ms延迟（移动端的双击会缩放导致click判断延迟）
// FastClick.attach(document.body);

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={Store}>
      <RouterConfig />
    </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
