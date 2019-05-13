import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../less/about.less';
import { getReservations } from '../request/api';

const classNames = require('classnames');

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: false,
    };
  }

  componentWillMount() {
    this.setState({
      update: false,
    });
  }

  componentDidMount() {
    getReservations().then((res) => {
      console.log(res, 'getReservations');
    });
  }

  render() {
    const { update } = this.state;

    return (
      <div className="page-about">
        <div>about.</div>
        <div
          className={classNames({ number: true, 'fade-appear': update })}
        >
          aaa
        </div>
        <Link to="/">index page</Link>
      </div>
    );
  }
}

export default About;
