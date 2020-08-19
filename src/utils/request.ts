/**
 * @Description: 公共调用
 * @param {iconfont图标} MyIcon
 * @param {fetch请求方法} request
 */
import { createFromIconfontCN } from '@ant-design/icons';

export const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1636008_tovc4f2oj4a.js',
});

export default function request(url: string, method: string, body?: any, history?: any) {
  method = method.toUpperCase();
  if (method === 'GET') {
    body = undefined;
    let bodyData: any = [];
    Object.keys(body).forEach(key => bodyData.push(key + '=' + body[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + bodyData.join('&')
    } else {
      url += '&' + bodyData.join('&')
    }
  } else {
    body = body && JSON.stringify(body);

  }
  // let reqUrl = process.env.REMOTE_SERVER_IP + url;
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body
  }).then((res) => {
    // 401 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
    if (res.status === 401) {
      history.push('/');
      return Promise.reject('Unauthorized.');
    } else {
      return res.json();
    }
  });
}

export const get = (url: string) => request('GET', url);
export const post = (url: string, body: any) => request('POST', url, body);

