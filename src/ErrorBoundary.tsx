/*
 * @Author: Shabby申
 * @Date: 2020-08-31 09:57:02
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-31 10:12:13
 * 错误处理边界
 */
import React, { Component } from "react";

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  // 接收两个参数 抛出的错误 & 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息（组件栈追踪）。
  componentDidCatch(error: any, errorInfo: any) {
    console.log("error :>> ", error);
    console.log("errorInfo :>> ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
