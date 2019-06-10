const fakeResponseLocations = {
  latitude: 31.2292592,
  longitude: 121.5579122,
  name: 'Kerry Parkside',
  uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
};

const fakeResponseReservations = {
  source: '02108548-f3d2-411c-9599-ba3d3857e1fc',
  target: 'ca072ea7-460f-48b8-a055-16e0e6e0399b',
  count: 1,
};

const getLocations = jest.fn(() => Promise.resolve({
  data: fakeResponseLocations,
}));
const getReservations = jest.fn(() => Promise.resolve({
  data: fakeResponseReservations,
}));

describe('request', () => {
  // 断言必须返回一个primose
  it('works with promises', () => {
    getLocations().then((data) => {
      console.log(data.data, '===ddddd===');
      return expect(data.data).toEqual({
        latitude: 31.2292592,
        longitude: 121.5579122,
        name: 'Kerry Parkside',
        uuid: '02108548-f3d2-411c-9599-ba3d3857e1fc',
      });
    });
  });

  it('check getReservations() response', () => {
    getReservations().then((data) => {
      console.log(data.data);
      return expect(data.data).toEqual({
        source: '02108548-f3d2-411c-9599-ba3d3857e1fc',
        target: 'ca072ea7-460f-48b8-a055-16e0e6e0399b',
        count: 1,
      });
    });
  });
});
