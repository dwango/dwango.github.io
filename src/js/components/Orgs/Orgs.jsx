"use strict";
import React from "react";

import styles from './Orgs.css';

const Org = ({org}) => (
  <div>
    <a href={org.htmlUrl} className={styles.linkArea}>
      <div style={{backgroundImage: `url(${org.avatarUrl})`}} className={styles.avatarImage}></div>
      <div className={styles.name}>
        {org.login}
      </div>
    </a>
    <div className={styles.repoCount}>
      {org.publicRepos} repositories
    </div>
    <div className={styles.description}>
      {org.description}
    </div>
  </div>
);

const Orgs = ({organizations}) => (
  <div className={styles.container}>
    <h2 className={styles.header}>
      Organizations
    </h2>
    <ul className={styles.organizations}>
      {organizations.map(org => (
        <li key={org.login} className={styles.organizations__item}>
          <Org org={org} />
        </li>
      ))}
    </ul>
  </div>
);

Orgs.propTypes = {
  organizations: React.PropTypes.array.isRequired,
};

export default Orgs;

