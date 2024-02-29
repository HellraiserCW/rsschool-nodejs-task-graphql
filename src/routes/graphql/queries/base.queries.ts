import { GraphQLObjectType } from 'graphql/type/index.js';
import { UserQueries } from './user.queries.js';

export const BaseQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'BaseQuery',
    fields: {
        ...UserQueries
    }
});
