#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

rm -rf .git

git init
git add -A
git commit -m 'deploy'

git push -f git@github1.com:hchengx/hchengx.github.io master

rm -rf docs/.vuepress/dist

cd -