import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loading-go">
        <img src={require('../../../static/images/loading.svg')} alt="loading" />
        Fetching the data.
      </div>
    );
  }
}

export default Loading;
