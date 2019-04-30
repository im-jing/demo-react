import React, { Component } from 'react';
import styled from 'styled-components';

import {
  getLocations,
  getReservations,
  getFeedList,
} from '../request/api';

const Section = styled.section`
  background: #f2f2f2;
  border-bottom: 1px solid #999;
  color: ${props => (props.red ? 'red' : 'blue')};
`;
const Section2 = styled(Section)`
  border-color: black;
`;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps')
  // }

  componentDidMount() {
    getLocations();
    getReservations({ name: 'aaa', title: 'manager' });

    const paramsRole = {
      page: 1,
      size: 1,
    };
    getFeedList(paramsRole);
  }

  // linkToAbout() {
  //   this.props.history.push('about');
  // }

  render() {
    return (
      <div className="page-home">
        <div>here is test 123.</div>
        <Section red>aaa</Section>
        <Section>bbb</Section>
        <Section2 red>ccc</Section2>
        <button type="button">link to About page</button>

      </div>
    );
  }
}

export default Home;
