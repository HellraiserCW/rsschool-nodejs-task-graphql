import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { Post } from '../interfaces/post.interface.js';

const getPosts = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const posts: Post[] = await prisma.post.findMany({
            where: {authorId: {in: userIDs}}
        });
        const postsById: Map<string, Post[]> = posts.reduce((map, post) => {
            const postsList: Post[] = map.get(post.authorId) || [];

            postsList.push(post);
            map.set(post.authorId, postsList);

            return map;
        }, new Map<string, Post[]>());

        return userIDs.map((id) => postsById.get(id) || []);
    };
};

export const postsLoader = (prisma: PrismaClient) => new DataLoader(getPosts(prisma));
