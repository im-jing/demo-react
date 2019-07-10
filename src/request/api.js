import fetch from '../utils/http';

const publicConf = require('../../config/public.conf');

export function getLocations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/locations`;
  return fetch.get(url, data || {});
}

export function getReservations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/reservations`;
  return fetch.get(url, data || {});
}

export function getRoleList(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/list?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d`;
  return fetch.get(url, data || {});
}

// post json
export function addRole(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/add?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d`;
  return fetch.post(url, data || {});
}

export function removeRole(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/deleteById/${data.id}`;
  return fetch.get(url, data || {});
}
