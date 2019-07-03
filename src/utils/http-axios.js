import axios from 'axios';
// import qs from 'qs';

const accessToken = 'eyJraWQiOiJFRjRGMjJDMC01Q0IwLTQzNDgtOTY3Qi0wMjY0OTVFN0VGQzgiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJ3d2NoaW5hIiwiYXVkIjoid3djaGluYS1pb3MiLCJzdWIiOiIiLCJpYXQiOjE1NDY0MDA0NDMsImp0aSI6IjJiYzMyMWM2LWNhZGYtNDQyYS1iY2M5LWE1NzM1NTEyYjUxMyIsInVpZCI6LTF9.lT_kQ0Ctt6_UA_diBA7vxtN-HTcq5HrQer7Epb3QeW6_eC2-OsVQctqUZA0A-gjndNM6FWl8-581GDHdlEuxSg';

// 根据状态码，统一处理接口异常
export const checkStatus = (res) => {
  // console.log(res, '==res==');
  const statusCode = res.status;
  let errMsg;
  switch (statusCode) {
    case 401:
      console.log('not authorized');
      errMsg = 'not authorized';
      break;
    case 404:
      console.log('Request failed with status code 404');
      errMsg = 'Request failed with status code 404';
      break;
    case 405:
      console.log('token过期');
      errMsg = 'token过期';
      break;
    default:
      // console.log(res, '==res==');
      errMsg = '未知错误';
  }

  return Promise.reject(errMsg);
};

// axios拦截器
export const axiosApi = (url, method, type, params = {}) => {
  // console.log('==enter axiosApi fn==');
  // method为get类型，传参用params，否则用data
  const data = (method === 'GET') ? 'params' : 'data';
  // 一般后台要求传入的是json格式，但是有时候后台要求传入form-data形式
  // 方法一：区分content-type
  // const contentType = (type === 'json')
  //   ? Object.assign(
  //     { 'Content-Type': 'application/json' },
  //     { Accept: 'application/json' },
  //   )
  //   : { 'Content-Type': 'application/x-www-form-urlencoded' };
  // const headers = {
  //   'Content-Type': contentType,
  // };

  // 方法二：qs序列化, 等有可以测试的可有再调试

  const headers = Object.assign(
    {
      'Content-Type': 'application/json',
    }, {
      locale: 'zh_CN',
      Authorization: `X-CAT ${accessToken}`,
    },
  );

  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      [data]: params,
      headers,
    })
      .then((response) => {
        console.log(resolve, '====success====');
        resolve(response);
      })
      .catch((error) => {
        console.log(error, '===fail===');
        checkStatus(error);
      });
  });
};

export default {
  get: (url, params) => axiosApi(url, 'GET', 'json', params),
  post: (url, params) => axiosApi(url, 'POST', 'json', params),
  // post: (url, params) => axiosApi(url, 'POST', 'form', params),
  // postJson: (url, params) => axiosApi(url, 'POST', 'json', params),
  put: (url, params) => axiosApi(url, 'PUT', 'json', params),
  delete: (url, params) => axiosApi(url, 'DELETE', 'json', params),
};
