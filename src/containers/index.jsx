import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../components/loading/index';
import { Tabs, Tab } from '../components/tabs/index';

import {
  getLocations,
  // getReservations,
  // getFeedList,
} from '../request/api-axios';

const Section = styled.section`
  background: #f2f2f2;
  border-bottom: 1px solid #999;
  color: ${props => (props.red ? 'red' : 'blue')};
`;
const Section2 = styled(Section)`
  border-color: black;
`;
class Home extends Component {
  // static propTypes = {
  //   history: PropTypes.shape({
  //     pathname: PropTypes.string.isRequired,
  //   }).isRequired,
  // }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      sum: 0,
      activeTabIdx: 0,
      list: [],
    };
    this.sendRequest = null;
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps')
  // }

  async componentDidMount() {
    this.sendRequest = await getLocations();

    console.log(this.sendRequest, 'this.sendRequest');
    // getReservations({ name: 'aaa', title: 'manager' });

    // const paramsRole = {
    //   page: 1,
    //   size: 1,
    // };
    // getFeedList(paramsRole);

    const sum = this.plus(2, 5);
    this.setState({
      loading: false,
      sum,
      list: this.sendRequest.data,
    });
  }

  componentWillUnmount() {
    // abortFetching();
    console.log('Fetch abort');
    this.sendRequest.abort();
  }

  plus = (a, b) => a + b

  switchToAbout = () => {
    // const { history } = this.props;
    // history.push('about');
  }

  renderLocationList = () => {
    const { list } = this.state;

    return list.map(item => <li key={item.name}>{ item.name }</li>);
  }

  render() {
    const { loading, sum, activeTabIdx } = this.state;

    return (
      <React.Fragment>
        {loading
          ? <Loading />
          : (
            <div className="page-home">
              <div>here is test 123.</div>
              <Section red>{sum}</Section>
              <Section>bbb</Section>
              <Section2 red>ccc</Section2>
              <Link to="/about">about link</Link>
              <Tabs activeTabIdx={activeTabIdx}>
                <Tab name="Tab A">
                  <ul>{this.renderLocationList()}</ul>
                </Tab>
                <Tab name="Tab B">
                  <p>bbb</p>
                </Tab>
                <Tab name="Tab C">
                  <p>ccc</p>
                </Tab>
              </Tabs>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}

export default Home;
