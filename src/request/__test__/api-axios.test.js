// import { getLocations } from '../api-axios';

jest.mock('../../utils/http-axios');

const fakeResponseLocations = {
  latitude: 31.2292592,
  longitude: 121.5579122,
  name: 'Kerry Parkside',
  uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
};

const getLocations = jest.fn(() => Promise.resolve({
  data: fakeResponseLocations,
}));

describe('request', () => {
  // 断言必须返回一个primose
  it('should get the response of getLocations()', () => {
    getLocations().then((response) => {
      // console.log(response.data, '===ddddd===');
      return expect(response.data).toEqual({
        latitude: 31.2292592,
        longitude: 121.5579122,
        name: 'Kerry Parkside',
        uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
      });
    });
  });

});
