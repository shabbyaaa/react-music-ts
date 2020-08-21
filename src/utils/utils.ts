/*
 * @Author: Shabby申 
 * @Date: 2020-05-21 22:20:22 
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-21 23:33:30
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