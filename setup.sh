#!/bin/sh

npm install webpack webpack-cli --save-dev
npm install --save-dev typescript ts-loader

npx webpack -d --watch --color
