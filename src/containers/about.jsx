import React, { Component } from 'react';
import '../less/about.less';

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
    setInterval(() => {
      this.setState({
        update: true,
      });
    }, 2000);
  }

  shouldComponentUpdate() {

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
      </div>
    );
  }
}

export default About;
