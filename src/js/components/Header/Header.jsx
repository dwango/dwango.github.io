"use strict";

import React from 'react';
import InlineSVG from 'svg-inline-react';

import styles from './Header.css';

const Header = ({repositories}) => (
  <header className={styles.header}>
    <div className={styles.logoArea}>
      <InlineSVG src={require('svg-inline!./logo.svg')} />
    </div>
    <div className={styles.header__subText}>
      {repositories.length} repositories developed by DWANGO engineers.
    </div>
  </header>
);
export default Header;
