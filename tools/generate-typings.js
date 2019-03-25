const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/api/src/**/*.graphql', "!**/generated/**"],
  path: 'libs/api-interface/src/lib/graphql.ts',
  outputAs: 'class',
});
