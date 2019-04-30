import fetch from '../utils/http';

export function getLocations(data) {
  const url = 'http://tv-dashboard.wework.cn/locations';
  return fetch.get(url, data || {});
}

export function getReservations(data) {
  const url = 'http://tv-dashboard.wework.cn/reservations';
  return fetch.get(url, data || {});
}

export function getFeedList(data) {
  const url = 'https://zuul-ut.nakedhub.com/feedService/api/v1/be/feed/list?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d';
  return fetch.postJson(url, data || {});
}
