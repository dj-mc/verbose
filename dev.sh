#!/usr/bin/env bash

cd client; yarn run dev \
& cd ../server; yarn run dev \
& yarn run build:watch \
& docker compose up -d \
& cd ../common; yarn run build:watch
