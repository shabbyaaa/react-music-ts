/*
 * @Author: Shabby申
 * @Date: 2020-05-17 12:38:17
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-19 18:13:44
 * @description: 布局样式
 */
import React, { Component } from 'react'
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { MyIcon } from "../utils/request";
// import "./style.less";
import styles from './style.less';

class BasicLayout extends Component<RouteComponentProps> {

  render() {
    return (
      <div>
        <div className={styles.topWrap}>
          <span>
            <MyIcon type="iconcaidan" className={styles.iconfont} />
          </span>
          <span>云音乐</span>
          <span>
            <MyIcon type="iconsearch" className={styles.iconfont} />
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
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(BasicLayout);