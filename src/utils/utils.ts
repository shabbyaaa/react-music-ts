/*
 * @Author: Shabby申 
 * @Date: 2020-05-21 22:20:22 
 * @Last Modified by: Shabby申
 * @Last Modified time: 2020-08-23 18:35:50
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

export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

//转换歌曲播放时间
export const formatPlayTime = (interval: any) => {
  interval = interval | 0;// |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: any[]) {
  let new_arr: any[] = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song: any, list: any) => {
  return list.findIndex((item: any) => {
    return song.id === item.id;
  });
};

export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0;

//顶部的高度
export const HEADER_HEIGHT = 45;

// 播放模式
export const playMode = {
  sequence: 0, //顺序
  loop: 1,  //循环
  random: 2  //随机
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