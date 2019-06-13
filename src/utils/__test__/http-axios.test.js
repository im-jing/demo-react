import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { axiosApi } from '../http-axios';

jest.mock('axios');

test('aaa', () => {
  const resp = {
    latitude: 31.2292592,
    longitude: 121.5579122,
    name: 'Kerry Parkside',
    uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
  };
  axios.get.mockImplementationOnce(() => Promise.resolve(resp));
  return axiosApi().then(data => expect(data).toEqual('aa'));
});
