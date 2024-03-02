import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

import { Post } from './post.interface.js';
import { Profile } from './profile.interface.js';
import { User } from './user.interface.js';
import { Member } from './member.interface.js';

export type DataLoaders = {
    userLoader: DataLoader<string, User>;
    subscribedToUserLoader: DataLoader<string, User[]>;
    userSubscribedToLoader: DataLoader<string, User[]>;
    memberTypeLoader: DataLoader<string, Member>;
    postsLoader: DataLoader<string, Post[]>;
    profileLoader: DataLoader<string, Profile>;
};

export interface GqlContext {
    prisma: PrismaClient;
    loaders: DataLoaders;
}
