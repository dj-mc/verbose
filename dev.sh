#!/usr/bin/env bash

# if [ ! -f .env ]; then
#     export "$(cat server/.env | xargs)"
# fi

tmux \
    new-session  "cd client || exit; yarn run dev"\; \
    split-window "cd common || exit; yarn run build:watch"\; \
    new-session  "cd server || exit; yarn run dev:env"\; \
    split-window "cd server || exit; yarn run build:watch"\; \
    new-session  "cd server || exit; docker compose up --remove-orphans"\; \
