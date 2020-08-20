/*
 * @Author: Shabby申 
 * @Date: 2020-08-20 10:48:21 
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-20 11:11:08
 * 简单封装本地存储 供外部调用
 */
const store = window.localStorage;

class LocalStore {
  public static set(key: string, value: any) {
    if (!store) return;
    let v = value;
    try {
      if (typeof value === 'object') {
        v = JSON.stringify(v);
      }
      store.setItem(key, v);
    } catch (error) {

    }
  }

  public static get(key: string) {
    if (!store) return;
    return store.getItem(key);
  }

  public static getJson(key: string) {
    if (!store) return;
    const data = store.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) { }
    }
    return null;
  }

  public static remove(key: string) {
    if (!store) return;
    try {
      store.removeItem(key);
    } catch (error) { }
  }
}

export default LocalStore