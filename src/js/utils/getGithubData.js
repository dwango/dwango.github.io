"use strict";
import GitHub from "github-api";
import axios from 'axios';
import _ from 'lodash';

import config from '../../configs/config';

function getRepositories() {
  const github = new GitHub({
    token: process.env.GITHUB_TOKEN
  });

  return Promise.all(
    config.organizations.map(orgName =>
      github.getOrganization(orgName).getRepos().then(res => res.data)
    )
  )
    .then(repos => _.chain(repos)
      .flatten()
      .map(repo => {
        const pinIndex = _.findIndex(config.pins, v => v.full_name === repo.full_name);
        return {
          language       : repo.language,
          description    : config.pins[pinIndex] ? config.pins[pinIndex].description : repo.description,
          fullName       : repo.full_name,
          updatedAt      : repo.updated_at,
          htmlUrl        : repo.html_url,
          stargazersCount: repo.stargazers_count,
          homepage       : repo.homepage,
          pinIndex       : pinIndex >= 0 ? pinIndex : null
        };
      })
      .sortBy([ // pinされてるものはpin順、そうでないものはstar数降順
        repo => repo.pinIndex === null ? Infinity : repo.pinIndex,
        repo => -repo.stargazersCount
      ])
      .value()
    );
}


function getOrganizations() {
  const requestConfig = process.env.GITHUB_TOKEN ? {
    headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
  } : {};

  return Promise.all(
    config.organizations.map(orgName =>
      axios.get(`https://api.github.com/orgs/${orgName}`, requestConfig).then(res => res.data)
    )
  )
    .then(orgs =>
      orgs.map(org => ({
        avatarUrl  : org.avatar_url,
        description: org.description,
        htmlUrl    : org.html_url,
        login      : org.login,
        name       : org.name,
        publicRepos: org.public_repos
      }))
    );
}


// cache for better developing
let dataCache;
export default function getGithubData() {
  if (dataCache) {
    return Promise.resolve(dataCache);
  }

  return Promise.all([
    getRepositories(),
    getOrganizations()
  ])
    .then(([repositories, organizations]) => {
      const data = {repositories, organizations};
      dataCache = data;
      return data;
    });
}
