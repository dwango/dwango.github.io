"use strict";
import React from "react";
import {emojify} from "react-emojione";
import StarIcon from "react-icons/lib/go/star";
import GitHubIcon from "react-icons/lib/go/mark-github";
import HomeIcon from "react-icons/lib/fa/home";

import styles from './Repos.css';

const RepoCard = ({repo}) => (
  <div className={styles.repositories__itemInner}>
    <a className={styles.fullName} href={repo.htmlUrl}>
      {repo.fullName}
    </a>
    <div className={styles.infomation}>
      {repo.language ? (
        <span className={styles.language}>
                {repo.language}
              </span>
      ) : null}
      <span className={styles.stargazersCount}>
                <StarIcon />{repo.stargazersCount}
              </span>
    </div>
    <div className={styles.links}>
      {repo.homepage ? (
        <a className={styles.homepageLink} href={repo.homepage}>
          <HomeIcon />HOMEPAGE
        </a>
      ) : null}
      <a className={styles.githubLink} href={repo.htmlUrl}>
        <GitHubIcon />GITHUB
      </a>
    </div>
    <div className={styles.description}>
      {emojify(repo.description ? repo.description : '', {output: 'unicode'})}
    </div>
  </div>
);

class Repos extends React.Component {
  constructor() {
    super();
    this.state = {
      moreButtonPushed: false
    };
  }

  render() {
    const {repositories} = this.props;
    const repositoriesForView = this.state.moreButtonPushed ? repositories : repositories.slice(0, 11);
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>
          Repositories
        </h2>
        <ul className={styles.repositories}>
          {repositoriesForView.map(repo =>
            <li key={repo.fullName} className={styles.repositories__item}>
              <RepoCard repo={repo} />
            </li>
          )}
        </ul>
        {this.state.moreButtonPushed ? null : (
          <button className={styles.moreButton} onClick={() => this.setState({moreButtonPushed: true})}>
            {repositories.length - 11} more repositories
          </button>
        )}
      </div>
    );
  }
}

Repos.propTypes = {
  repositories: React.PropTypes.array.isRequired,
};

export default Repos;

