#!/bin/bash

cd client
node_modules/.bin/webpack
cp build/main.js ../server/static/
cd ../server
go build
./server
