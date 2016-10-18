"use strict";

import React from 'react';
import InlineSVG from 'svg-inline-react';

import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.logoAndLink}>
      <div className={styles.logoArea}>
        <a href="http://dwango.co.jp/" target="_blank" className={styles.logoLink}>
          <InlineSVG src={require('svg-inline!./logo.svg')} />
        </a>
      </div>
      <ul className={styles.links}>
        <li className={styles.links__item}>
          <a className={styles.links__link} href="http://dwango.co.jp/corporate/" target="_blank">会社情報</a>
        </li>
        <li className={styles.links__item}>
          <a className={styles.links__link} href="http://dwango.co.jp/recruit/" target="_blank">採用情報</a>
        </li>
      </ul>
    </div>
    <div className={styles.bottomText}>
      © dwango 2016
    </div>
  </footer>
);
export default Footer;

