
// import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
// import { makeExecutableSchema } from 'graphql-tools';

// const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')), { all: true });
// const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;

import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

const schema = loadSchemaSync(join(__dirname, './types/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const resolvers = mergeResolvers(loadFilesSync(join(__dirname, './resolvers')));
// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

export default schemaWithResolvers;