import React from 'react';
import { shallow } from 'enzyme';

import { Tabs, Tab } from './index';

describe('Tabs', () => {
  const props = {
    activeTabIdx: 0,
  };
  // const mockFn = jest.fn();

  // const handleTabClick = new mockFn();

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Tabs {...props}>
        <Tab>aaaa</Tab>
        <Tab>bbbb</Tab>
      </Tabs>,
    );
  });

  it('render the tabs to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('tabs has two items', () => {
    // expect(wrapper.children().length).toEqual(2);
    expect(wrapper.children()).toHaveLength(2);
  });

  // it('simulate click on the tab', () => {
  //   const tab = wrapper.children();
  //   tab.simulate('click');
  //   expect(tab.text()).toEqual('aaa');
  // });
});
