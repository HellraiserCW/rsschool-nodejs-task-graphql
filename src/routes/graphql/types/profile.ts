import { GraphQLList, GraphQLObjectType } from 'graphql/type/index.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({

    })
});

export const ProfilesType: GraphQLList<GraphQLObjectType> = new GraphQLList(ProfileType);
