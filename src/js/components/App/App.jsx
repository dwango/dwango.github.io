"use strict";

import React from "react";
import {connect} from "react-redux";

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Orgs from '../Orgs/Orgs';
import Repos from '../Repos/Repos';
import styles from './App.css';

const App = ({repositories, organizations}) => (
  <div>
    <Header repositories={repositories} />
    <div className={styles.container}>
      <Repos repositories={repositories} />
      <Orgs organizations={organizations} />
      <Footer />
    </div>
  </div>
);

const RAppBox = connect(
  state => state
)(App);

export default RAppBox;
