#!/bin/sh
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate
echo 1 > ./utils/blockNumber
