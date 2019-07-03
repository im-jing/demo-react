import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { axiosApi, checkStatus } from '../http-axios';

// jest.mock('axios');

// This sets the mock adapter on the default instance
const axiosMock = new MockAdapter(axios);
const mockData = {
  latitude: 31.2292592,
  longitude: 121.5579122,
  name: 'Kerry Parkside',
  uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
};

describe('send a request', () => {
  axiosMock.onAny('/success_request').replyOnce(200, mockData);

  it('should return data successfuly', async () => {
    const res = await axiosApi('/success_request', 'GET', 'json', {});

    expect(res.data).toEqual(mockData);
  });

  // axiosMock.onAny('/network_error').networkError();
  it('should throw Network Error', async () => {
    let error;
    const mockError = new Error('Request failed with status code 404');

    try {
      const throwErr = new Error('404');

      await axiosApi('/network_error', 'GET', 'json', {});
    } catch (e) {
      console.log(e, '==========e==========');
      // error = e;
      // console.log(error, '=======');
    }

    // expect(error).toEqual(mockError);
  });
});
