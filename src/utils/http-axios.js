import axios from 'axios';

export const MethodType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

// axios拦截器
export const request = (url, method = MethodType.GET, params = {}, config = {}) => {
  const data = (method === 'GET') ? 'params' : 'data';
  let headers = {
    'Content-Type': 'application/json',
  };

  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers,
    };
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      [data]: params,
      headers,
    }).then(resolve)
      .catch((error) => {
        console.dir(error);
        reject(error);
      });
  });
};
