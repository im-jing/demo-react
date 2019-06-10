import axios from '../utils/http-axios';

const publicConf = require('../../config/public.conf');

export function getLocations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/locations`;
  return axios.get(url, data || {});
}

export function getReservations(data) {
  const url = `${publicConf.SERVER_API_BASEURL}/reservations`;
  return axios.get(url, data || {});
}

export function getRoleList(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/list?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d`;
  return axios.get(url, data || {});
}

// post json
export function addRole(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/add?appId=weworkChina&sign=60c8d9bc7bf2c108e641090766529b5d`;
  return axios.post(url, data || {});
}

export function removeRole(data) {
  const url = `${publicConf.SERVER_API_BASEURL2}/userService/api/v1/be/admin/deleteById/${data.id}`;
  return axios.get(url, data || {});
}
