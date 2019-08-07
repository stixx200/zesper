# Start with prisma

## Once

- Install npm module prisma globally: `npm install -g prisma`
- Install npm module graphql-cli globally: `npm install -g graphql-cli`

## Start docker containers

- Start docker with `docker-compose up -d`
- Stop docker with `docker-compose down` or
- Stop docker and remove data with `docker-compose down -v`

## When needed

- Deploy prisma schema with `npm run prisma:deploy` in directory 'apps/api/src/prisma'
- Access to prisma with browser now needs access token. Token can be aquired with `npm run prisma:token`
  This token needs to be included in the playground "HTTP HEADERS" section. Example:
  ```
  {
    "Authorization": "Bearer <aquired token>"
  }
  ```

- Get schema from prisma server with `npm  run prisma:get-schema`
- Generate typescript typings with `npm run prisma:codegen`
  
