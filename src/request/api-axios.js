import { request, MethodType } from '../utils/http-axios';

const publicConf = require('../../config/public.conf');

export function getLocations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/locations`;
  return request(url, MethodType.get, data || {});
}

export function getReservations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/reservations`;
  return fetch.get(url, MethodType.get, data || {});
}

// export function getFeedList(data) {
//   const url = 'https://zuul-ut.nakedhub.com/feedService/api/v1/be/feed/list?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d';
//   return fetch.postJson(url, data || {});
// }
