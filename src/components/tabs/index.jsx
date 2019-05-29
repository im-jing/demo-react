import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

export class Tabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIdx: props.activeTabIdx,
    };
  }

  handleTabClick = (idx) => {
    this.setState({
      activeIdx: idx,
    });
  }

  renderChildrenTabs = () => {
    const { children } = this.props;
    const { activeIdx } = this.state;

    return React.Children.map(children, (child, idx) => {
      const tabClass = activeIdx === idx ? 'tab-item active' : 'tab-item';

      return (
        <li>
          <button
            type="button"
            className={tabClass}
            onClick={() => this.handleTabClick(idx)}
          >
            {child.props.name}
          </button>
        </li>
      );
    });
  }

  renderTabActiveContent = () => {
    const { children } = this.props;
    const { activeIdx } = this.state;

    if (children[activeIdx]) {
      return children[activeIdx].props.children;
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul className="tabs">
          {this.renderChildrenTabs()}
        </ul>

        <div className="tabs-content">
          {this.renderTabActiveContent()}
        </div>
      </React.Fragment>
    );
  }
}
Tabs.propTypes = {
  activeTabIdx: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export const Tab = ({ children }) => <React.Fragment>{ children }</React.Fragment>;
Tab.propTypes = {
  children: PropTypes.node.isRequired,
};
