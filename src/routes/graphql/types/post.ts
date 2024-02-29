import { GraphQLList, GraphQLObjectType } from 'graphql/type/index.js';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({

    })
});

export const PostsType: GraphQLList<GraphQLObjectType> = new GraphQLList(PostType);
