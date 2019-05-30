import React from 'react';
import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Tabs from './index';

// configure({
//   adapter: new Adapter(),
// });

describe('Tabs', () => {
  it('wether match snapshot', () => {
    const wrapper = shallow(<Tabs />);

    expect(wrapper).toMatchSnapshot();
  });
});
