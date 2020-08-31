/*
 * @Author: Shabby申
 * @Date: 2020-05-17 12:38:17
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-31 10:17:19
 * @description: 布局样式
 */
import React, { Component } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { MyIcon } from "../utils/request";
import styles from "./style.less";
import Player from "../page/Player";

class BasicLayout extends Component<RouteComponentProps> {
  render() {
    return (
      <>
        <div className={styles.topWrap}>
          <span>
            <MyIcon type="iconcaidan" className={styles.iconfont} />
          </span>
          <span>云音乐</span>
          {/* 搜索按钮 => 触发事件 */}
          <span>
            <MyIcon
              onClick={() => this.props.history.push("/search")}
              type="iconsearch"
              className={styles.iconfont}
            />
          </span>
        </div>
        <div className={styles.tabWrap}>
          <NavLink activeClassName={styles.active} to="/recommend">
            推荐
          </NavLink>
          <NavLink activeClassName={styles.active} to="/singers">
            歌手
          </NavLink>
          <NavLink activeClassName={styles.active} to="/rank">
            排行榜
          </NavLink>
        </div>
        <Player />
        {this.props.children}
      </>
    );
  }
}

export default withRouter(BasicLayout);
