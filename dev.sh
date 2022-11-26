#!/usr/bin/env bash

cd client; yarn run dev \
& cd ../server; yarn run dev \
& yarn run build:watch \
& cd ../common; yarn run build:watch
