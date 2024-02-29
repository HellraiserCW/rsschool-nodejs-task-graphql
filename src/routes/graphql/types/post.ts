import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { Post } from '../interfaces/post.interface.js';
import { GraphqlContext } from '../interfaces/app.interface.js';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: UUIDType },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: UUIDType },
        author: {
            type: UserType,
            resolve: async ({ authorId }: Post, {prisma}: GraphqlContext): Promise<void> => {
                await prisma.user.findFirst({ where: { id: authorId } });
            }
        }
    })
});

export const PostsType: GraphQLList<GraphQLObjectType> = new GraphQLList(PostType);

export const CreatePostType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreatePost',
    fields: () => ({
        authorId: { type: UUIDType },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const ChangePostType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangePost',
    fields: () => ({
        authorId: { type: UUIDType },
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});
