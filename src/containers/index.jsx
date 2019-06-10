import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../components/loading/index';
import { Tabs, Tab } from '../components/tabs/index';

import {
  getLocations,
  getRoleList,
  addRole,
  removeRole,
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
      roleList: [],
    };
    this.sendRequest = null;
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps')
  // }

  async componentDidMount() {
    this.sendRequest = await getLocations();

    const sum = this.plus(2, 5);
    this.setState({
      loading: false,
      sum,
      list: this.sendRequest.data,
    });

    this.getRoleListData();
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

  getRoleListData = async () => {
    // 测试发送post请求
    const getRoleParams = {
      email: '',
      page: 1,
      size: 10,
    };
    const roleListData = await getRoleList(getRoleParams);

    this.setState({
      loading: false,
      roleList: roleListData.data.data.list,
    });
  }

  renderLocationList = () => {
    const { list } = this.state;

    return list.map(item => <li key={item.name}>{ item.name }</li>);
  }

  renderRoleList = () => {
    const { roleList } = this.state;

    return roleList.map((item, idx) => (
      <tr key={item.id}>
        <td>{idx + 1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.locationName}</td>
        <td><button type="button" onClick={() => this.onRemoveRole(item.id)}>Remove</button></td>
      </tr>
    ));
  }

  onAddRole = async () => {
    const addRoleParams = {
      email: 'a@a.com',
      location: 412,
      name: 'a',
      roleIds: [7],
    };

    await addRole(addRoleParams)
      .then((response) => {
        console.log(response.data, 'res code');
        if (response.data.code === 0) {
          this.getRoleListData();
        } else {
          alert(response.data.msg);
        }
      });
  }

  onRemoveRole = async (id) => {
    const removeRoleParams = {
      id,
    };

    await removeRole(removeRoleParams)
      .then((response) => {
        if (response.data.code === 0) {
          this.getRoleListData();
        } else {
          alert(response.data.msg);
        }
      });
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
                  <button type="button" onClick={() => this.onAddRole()}>Add</button>
                  <table>
                    <tbody>
                      {this.renderRoleList()}
                    </tbody>
                  </table>
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
