import AbortController from 'abort-controller';

const accessToken = 'eyJraWQiOiJFRjRGMjJDMC01Q0IwLTQzNDgtOTY3Qi0wMjY0OTVFN0VGQzgiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJ3d2NoaW5hIiwiYXVkIjoid3djaGluYS1pb3MiLCJzdWIiOiIiLCJpYXQiOjE1NDY0MDA0NDMsImp0aSI6IjJiYzMyMWM2LWNhZGYtNDQyYS1iY2M5LWE1NzM1NTEyYjUxMyIsInVpZCI6LTF9.lT_kQ0Ctt6_UA_diBA7vxtN-HTcq5HrQer7Epb3QeW6_eC2-OsVQctqUZA0A-gjndNM6FWl8-581GDHdlEuxSg';

// 根据状态码，统一处理接口异常
export const checkStatus = (res) => {
  const statusCode = res.code;
  switch (statusCode) {
    case 401:
      console.log('not authorized');
      break;
    case 405:
      console.log('token过期');
      break;
    default:
      throw new Error();
  }
};

/* fetch add timeout & abort property */
const fetchRequst = (fetchPromise, timeout, cancel) => {
  let abortFn = null;
  let timeoutFn = null;

  // timeout Promise
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutFn = () => {
      cancel();
      reject(new Error('网络请求超时'));
    };
  });


  // 这是一个可以被reject的promise
  const abortPromise = new Promise((resolve, reject) => {
    console.log('==abortPromise==');
    abortFn = () => {
      console.log('abortFn');
      // abort Function
      cancel();
      reject(new Error('abort promise'));
    };
  });

  // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortablePromise = Promise.race([
    fetchPromise,
    timeoutPromise,
    abortPromise,
  ]);

  // 计时器设置超时
  setTimeout(() => {
    timeoutFn();
  }, timeout);

  // 给abortablePromise增加一个abort方法
  abortablePromise.abort = abortFn;

  return abortablePromise;
};

/* fetch请求封装 */
const fetchApi = (url, body, method, type) => {
  // 设置超时时间
  const timeout = 10;
  // 设置不同type的contentType
  const contentType = type === 'json'
    ? { 'Content-Type': 'application/json;charset=UTF-8' }
    : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
  // 创建控制器
  const controller = new AbortController();
  // 创建一个signal
  const { signal } = controller;
  // 取消请求
  const cancel = () => {
    console.log('cancel fn');
    return controller.abort();
  };

  // 处理不同method过来的body
  let myBody;
  if (method === 'GET' && body) {
    const paramsArray = [];
    // encodeURIComponent
    Object.keys(body).forEach(key => paramsArray.push(`${key}=${body[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  } else {
    myBody = JSON.stringify(body);
  }

  const myInit = {
    body: myBody,
    cache: 'no-cache',
    // credentials: 'include', // include, same-origin, *omit
    headers: Object.assign(
      contentType,
      {
        locale: 'zh_CN',
        Authorization: `X-CAT ${accessToken}`,
      },
    ),
    method,
    mode: 'cors', // no-cors, cors, *same-origin
    signal,
  };

  const fetchPromise = new Promise((resolve, reject) => {
    console.log('==fetchPromise==');
    fetch(url, myInit)
      .then(
        res => res.json(),
        err => console.log(err),
      )
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  });
  return fetchRequst(fetchPromise, timeout, cancel);
};


export default {
  get: (url, body) => fetchApi(url, body, 'GET', 'json'),
  post: (url, body) => fetchApi(url, body, 'POST', 'form'),
  postJson: (url, body) => fetchApi(url, body, 'POST', 'json'),
  put: (url, body) => fetchApi(url, body, 'PUT', 'json'),
  delete: (url, body) => fetchApi(url, body, 'DELETE', 'json'),
};
