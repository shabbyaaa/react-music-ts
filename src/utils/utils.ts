/*
 * @Author: Shabby申 
 * @Date: 2020-05-21 22:20:22 
 * @Last Modified by:   Shabby申 
 * @Last Modified time: 2020-05-21 22:20:22 
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