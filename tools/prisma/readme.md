# Start with prisma

## Once

- Install npm module prisma globally: `npm install -g prisma`
- Install npm module graphql-cli globally: `npm install -g graphql-cli`

## Start docker containers

- Start docker with `docker-compose up -d`
- Stop docker with `docker-compose down` or
- Stop docker and remove data with `docker-compose down -v`

## When needed

- Deploy prisma schema with `prisma deploy` in directory 'apps/api/src/prisma'

The following commands are executed in project root:

- Get schema from prisma server with `graphql get-schema --project database`
- Generate typescript typings with `graphql codegen --project database`
