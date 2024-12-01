#!/bin/sh
# run-migrations.sh

npx prisma migrate dev --name init
npx prisma db push
