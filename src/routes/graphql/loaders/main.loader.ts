import { PrismaClient } from '@prisma/client';

import { subscribersLoader, subscriptionsLoader, userLoader } from './user.loader.js';
import { memberLoader } from './member.loader.js';
import { postsLoader } from './posts.loader.js';
import { profileLoader } from './profile.loader.js';

export const dataLoaders = (prisma: PrismaClient) => ({
    userLoader: userLoader(prisma),
    subscribedToUserLoader: subscribersLoader(prisma),
    userSubscribedToLoader: subscriptionsLoader(prisma),
    memberTypeLoader: memberLoader(prisma),
    postsLoader: postsLoader(prisma),
    profileLoader: profileLoader(prisma)
});
