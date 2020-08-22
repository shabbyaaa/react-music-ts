/*
 * @Author: Shabby申 
 * @Date: 2020-05-21 22:20:22 
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-22 21:16:37
 * @Description 公共方法
 */
export const getCount = (count: number): string | number => {
  if (count < 0) return 0;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

export const getName = (list: any) => {
  let str = "";
  list.map((item: any, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0;

//顶部的高度
export const HEADER_HEIGHT = 45;

// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;

let vendor: string = (() => {
  //首先通过transition属性判断是何种浏览器
  let transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return '';
})();

export function prefixStyle(style: string): string {
  if (!vendor) {
    return '';
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}