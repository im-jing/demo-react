import Home from '../index';
import { Tabs, Tab } from '../../components/tabs/index';

jest.mock('../../request/api');

const wrapper = shallow(<Home />);

describe('Home Page', () => {
  it('render the Home to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the tabs component', () => {
    expect(wrapper.children(Tabs).length).toEqual(1);
    expect(wrapper.find(Tab).length).toEqual(3);
  });

  // it('fetch locations api and render the result on mount', (done) => {
  //   const wrapper = shallow(<Home />);

  //   // expect(wrapper.find())
  // });
});
