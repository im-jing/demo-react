import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../containers/index';
import About from '../containers/about';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const HomePage = (props) => {
      return (
        <Home {...props} />
      );
    };

    const AboutPage = (props) => {
      return (
        <About {...props} />
      );
    };

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomePage} />
          <Route path="/about" render={AboutPage} />
        </Switch>
      </Router>
    );
  }
}

export default Main;
