import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './index';

describe('Tabs', () => {
  it('wether match snapshot', () => {
    const wrapper = shallow(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });
});
