import { GraphQLObjectType } from 'graphql/type/index.js';
import { UserQueries } from './user.queries.js';
import { MemberQueries } from './member.queries.js';
import { PostQueries } from './post.queries.js';
import { ProfileQueries } from './profile.queries.js';

export const BaseQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'BaseQuery',
    fields: {
        ...UserQueries,
        ...MemberQueries,
        ...PostQueries,
        ...ProfileQueries
    }
});
