import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import { getLanguage } from '../utils/language';

import Main from '../router/index';

import zhCN from '../../static/locale/zh-CN';
import enUS from '../../static/locale/en-US';

import '../less/home.less';

const currentLang = getLanguage();
const userMessage = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

addLocaleData([...zh, ...en]);

ReactDOM.render(
  <IntlProvider locale={currentLang} messages={userMessage[currentLang]}>
    <Main />
  </IntlProvider>,
  document.getElementById('page-wrapper'),
);
