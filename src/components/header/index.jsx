import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getLanguage, setLanguage } from '../../utils/language';

import './index.less';

const Header = () => {
  const handleClick = () => {
    setLanguage();
  };

  return (
    <header className="header">
      <ul className="nav">
        <li>
          <Link to="/about">
            <FormattedMessage id="intl.about" />
          </Link>
        </li>
      </ul>
      <button className="lang" type="button" onClick={handleClick}>
        {getLanguage() === 'en-US' ? '中' : 'EN'}
      </button>
    </header>
  );
};

export default Header;
