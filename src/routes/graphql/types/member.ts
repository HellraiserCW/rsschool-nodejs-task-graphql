import { GraphQLList, GraphQLObjectType } from 'graphql/type/index.js';

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({

    })
});

export const MembersType: GraphQLList<GraphQLObjectType> = new GraphQLList(MemberType);
