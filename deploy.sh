#!/bin/bash
set -e

echo -e "Host github.com\n\tStrictHostKeyChecking no\nIdentityFile ~/.ssh/deploy.key\n" >> ~/.ssh/config &&
openssl aes-256-cbc -k "$SERVER_KEY" -in travis_deploy_key.enc -d -a -out deploy.key &&
cp deploy.key ~/.ssh/ &&
chmod 600 ~/.ssh/deploy.key &&
git config --global user.email "pocketberserker@gmail.com" &&
git config --global user.name "pocketberserker" &&
if [[ "${TRAVIS_BRANCH}" == "develop" && "${TRAVIS_PULL_REQUEST}" == "false" ]];
then npm run deploy ; fi
