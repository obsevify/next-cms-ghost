#!/bin/bash

npm-upgrade

mkdir ./compare

github="https://raw.githubusercontent.com"
repo="TryGhost/Casper"
branch="master"

wget -q -P compare -N ${github}/${repo}/${branch}/assets/css/global.css
wget -q -P compare -N ${github}/${repo}/${branch}/assets/css/screen.css

diff -q -s compare/global.css ./styles/global-original.css
diff -q -s compare/screen.css ./styles/screen-original.css

rm -rf compare out
