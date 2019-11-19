import React, { Component } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Loading from '../components/loading/index';
import Header from '../components/header/index';
import { Tabs, Tab } from '../components/tabs/index';

import {
  getLocations,
  getRoleList,
  addRole,
  removeRole,
  // getReservations,
  // getFeedList,
} from '../request/api';


const WebSocketClient = require('websocket').client;
const W3CWebSocket = require('websocket').w3cwebsocket;

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

    this.state = {
      loading: true,
      sum: 0,
      activeTabIdx: 0,
      list: [],
      roleList: [],
    };
    this.sendRequest = null;
    this.roleListData = null;
    this.client = null;
  }

  async componentDidMount() {
    // websocket
    this.socketConnect();

    this.distinct([1, 2, 2, 3]);
    this.sendRequest = await getLocations();

    const sum = this.plus(2, 5);
    this.setState({
      loading: false,
      sum,
      list: this.sendRequest,
    });

    this.getRoleListData();
  }

  componentWillUnmount() {
    // abortFetching();
    console.log('Fetch abort');
    console.log(this.sendRequest, '====');
    this.sendRequest.cancel();
    this.roleListData.cancel();
  }

  setStateAsync = nextState => new Promise((resolve) => {
    this.setState(nextState, resolve);
  })

  plus = (a, b) => a + b

  getRoleListData = async () => {
    // 测试发送post请求
    const getRoleParams = {
      email: '',
      page: 1,
      size: 10,
    };
    this.roleListData = await getRoleList(getRoleParams);

    // setState是异步,第二个参数是state更新完毕的回调函数
    // this.setState({
    //   loading: false,
    // }, () => {
    //   this.setState({
    //     roleList: this.roleListData.data.list,
    //   });
    // });

    await this.setStateAsync({
      loading: false,
      roleList: this.roleListData.data.list,
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

  testClosures = () => {
    for (let i = 1; i <= 5; i += 1) {
      setTimeout((function (j) {
        console.log(j);
      }(i)), 0);
    }
  }

  distinct = (arr) => {
    const res = [];

    for (let i = 0; i < arr.length; i++) {
      if (res.indexOf(arr[i]) === -1) {
        res.push(arr[i]);
      }
    }
    console.log(res);
  }

  socketConnect = () => {
    this.client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');

    this.client.onerror = this.wsOnError();

    this.client.onopen = this.wsOnOpen();

    this.client.onclose = this.wsOnClose();

    this.client.onmessage = this.wsOnMessage();
  }

  wsOnError = () => {
    console.log('Connection Error');
  }

  wsOnOpen = () => {
    console.log('WebSocket Client Connected');
    this.sendNumber();
  }

  sendNumber = () => {
    if (this.client.readyState === this.client.OPEN) {
      const number = Math.round(Math.random() * 0xFFFFFF);
      this.client.send(number.toString());
      setTimeout(this.sendNumber, 1000);
    }
  }

  wsOnClose = () => {
    console.log('echo-protocol Client Closed');
  }

  wsOnMessage = (e) => {
    console.log(e, '===ee===');
    if (typeof e.data === 'string') {
      console.log(`Received: '${e.data}'`);
    }
  }

  render() {
    const {
      loading, sum, activeTabIdx,
    } = this.state;

    return (
      <React.Fragment>
        {loading
          ? <Loading />
          : (
            <div className="page-home">
              <Header />
              <div>here is test 123.</div>
              <FormattedMessage id="intl.hello" />
              <Section red>{sum}</Section>
              <Section>bbb</Section>
              <Section2 red>ccc</Section2>
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
