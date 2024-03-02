import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { UUIDNonNullType, UUIDType } from './uuid.js';

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: UUIDType},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        authorId: {type: UUIDType}
    })
});

export const PostsType: GraphQLList<GraphQLObjectType> = new GraphQLList(PostType);

export const CreatePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
        authorId: {type: UUIDNonNullType},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
    })
});

export const ChangePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        id: {type: UUIDType},
        authorId: {type: UUIDType},
        title: {type: GraphQLString},
        content: {type: GraphQLString}
    })
});

export const CreatePostNonNullType: GraphQLNonNull<GraphQLInputObjectType> = new GraphQLNonNull(CreatePostInputType);

export const ChangePostNonNullType: GraphQLNonNull<GraphQLInputObjectType> = new GraphQLNonNull(ChangePostInputType);
