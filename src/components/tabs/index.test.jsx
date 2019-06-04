import React from 'react';
import { shallow } from 'enzyme';

import { Tabs, Tab } from './index';

const props = {
  activeTabIdx: 0,
};

let wrapper;

describe('Tabs', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Tabs {...props}>
        <Tab>aaaa</Tab>
        <Tab>bbbb</Tab>
        <Tab>cccc</Tab>
      </Tabs>,
    );
  });

  it('render the tabs to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('tabs has three items', () => {
    // expect(wrapper.children().first().find('li')).toEqual(3);
    expect(wrapper.children().first().find('li')).toHaveLength(3);
  });

  it('first render the tabs', () => {
    // console.log(wrapper.debug(), '==wrapper==');
    const tab = wrapper.children().find('.tabs li');
    const tabFirst = tab.at(0);
    const tabSecond = tab.at(1);
    const tabThird = tab.at(2);

    expect(tabFirst.find('button').hasClass('active')).toEqual(true);
    expect(tabSecond.find('button').hasClass('active')).toEqual(false);
    expect(tabThird.find('button').hasClass('active')).toEqual(false);
    expect(wrapper.state('activeIdx')).toEqual(0);
  });

  it('simulate click on the second tab', () => {
    wrapper.setState({ activeIdx: 1 });
    wrapper.children().find('.tabs li').at(1).simulate('click');

    expect(wrapper.children().find('.tabs li').at(0).find('button')
      .hasClass('active')).toEqual(false);
    expect(wrapper.children().find('.tabs li').at(1).find('button')
      .hasClass('active')).toEqual(true);
    expect(wrapper.state('activeIdx')).toEqual(1);
  });

  it('click the second tab, the handleTabClick() should be called', () => {
    // console.log(wrapper.props(), '===props===');
    // console.log(wrapper.debug(), '==wrapper==');
    // console.log(wrapper.instance(), '==wrapper.instance()==');
    wrapper.instance().handleTabClick = jest.fn();
    wrapper.children().find('.tabs li').at(1).find('button')
      .simulate('click');
    wrapper.setState({ activeIdx: 1 });

    expect(wrapper.instance().handleTabClick).toHaveBeenCalled();
    expect(wrapper.instance().handleTabClick).toHaveBeenCalledWith(wrapper.state('activeIdx'));
  });

  afterAll(() => {
    wrapper.unmount();
  });
});
