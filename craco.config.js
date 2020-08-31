/*
 * @Author: Shabby申
 * @Date: 2020-08-31 10:25:34
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-31 15:27:53
 * 不弹射项目 修改webpack的默认配置 使用craco插件
 */
const CracoLessPlugin = require("craco-less");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const Webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@page": path.resolve(__dirname, "./src/page"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
    plugins: [
      //显示启动和打包进度条
      new ProgressBarPlugin({
        format: `٩(๑❛ᴗ❛๑)۶ build  [:bar]  ${chalk.green.bold(
          "(:percent)"
        )}  ${chalk.red.bold("(:elapsed 秒)")}`,
        complete: chalk.green.bold("-"),
        clear: false,
      }),
      //设置全局变量，必须要加双引号
      new Webpack.DefinePlugin({
        "process.env": {
          SERVER_IP: `"http://localhost:4000"`,
        },
      }),
    ],
  },
  plugins: [
    //支持antd的less样式
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: { "@primary-color": "#1DA57A" },
          },
        },
        //加入css modules后 css名字将会转变成hash唯一值   引入就需要使用css modules（className={styles.XX})
        // 如不支持 modules 可把如下代码屏蔽 但是引入的css类名可能会重名，导致样式出错 (className="xxx")
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local][name]_[hash:base64:5]",
          },
        },
      },
    },
  ],
  devServer: {
    host: "0.0.0.0", //启动主机号，默认是localhost,设置 0.0.0.0 服务器外部可访问
    port: 3000, //启动端口，默认是3000
    historyApiFallback: true, //解决开启页面后白屏问题
    compress: true, //一切服务都启用gzip 压缩
    hot: true, //热更新
    //反向代理 => 前端解决跨域的问题
    proxy: {
      //请求时映射反向代理
      "/api/server": {
        target: "http://localhost:4000", //反向代理指向后台ip地址  target可以是域名
        pathRewrite: {
          "^/api/server": "", //地址重定向清除
        },
        changeOrigin: true, // 是否跨域
        // secure:false //反向代理可支持https
      },
    },
  },
};
