import { GraphQLBoolean } from 'graphql/type/index.js';
import { GraphqlContext, Query } from "../interfaces/app.interface.js"
import { ChangePost, CreatePost, Post } from '../interfaces/post.interface.js';
import { UUIDType } from '../types/uuid.js';
import { ChangePostType, CreatePostType, PostsType, PostType } from '../types/post.js';

export const PostQueries: Query = {
    post: {
        type: PostType,
        args: {id: {type: UUIDType}},
        resolve: async (_: unknown, {id}: Post, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.post.findFirst({where: {id}});
        }
    },
    posts: {
        type: PostsType,
        resolve: async ({prisma}: GraphqlContext): Promise<void> => {
            await prisma.post.findMany();
        }
    },
    createPost: {
        type: PostType,
        args: {data: {type: CreatePostType}},
        resolve: async (_: unknown, {data}: CreatePost, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.post.create({data: data});
        }
    },
    changePost: {
        type: PostType,
        args: {id: {type: UUIDType}, data: {type: ChangePostType}},
        resolve: async (_: unknown, {id, data}: ChangePost, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.post.update({where: {id}, data: data});
        }
    },
    deletePost: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDType}},
        resolve: async (_: unknown, {id}: Post, {prisma}: GraphqlContext): Promise<boolean> => {
            try {
                await prisma.post.delete({where: {id}});
            } catch {
                return false;
            }

            return true;
        }
    }
};
