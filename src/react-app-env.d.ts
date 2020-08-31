/// <reference types="react-scripts" />

// 在webpack里面配置 引入module的less 需要在这里导出一下
declare module "*.less" {
  const less: any;
  export default less;
}

declare module 'create-keyframe-animation';