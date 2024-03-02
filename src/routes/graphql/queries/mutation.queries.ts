import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

import { ChangeUserNonNullType, CreateUserNonNullType, UserType } from '../types/user.js';
import { ChangeUser, CreateUser, Subscription, User } from '../interfaces/user.interface.js';
import { UUIDNonNullType } from '../types/uuid.js';
import { ChangePostNonNullType, CreatePostNonNullType, PostType } from '../types/post.js';
import { ChangePost, CreatePost, Post } from '../interfaces/post.interface.js';
import { ChangeProfileNonNullType, CreateProfileNonNullType, ProfileType } from '../types/profile.js';
import { ChangeProfile, CreateProfile, Profile } from '../interfaces/profile.interface.js';
import { GqlContext } from '../interfaces/app.interface.js';

const UserMutationQueries = {
    createUser: {
        type: UserType,
        args: {dto: {type: CreateUserNonNullType}},
        resolve: async (_, {dto}: CreateUser, {prisma}: GqlContext) => {
            return await prisma.user.create({data: dto});
        }
    },
    changeUser: {
        type: UserType,
        args: {id: {type: UUIDNonNullType}, dto: {type: ChangeUserNonNullType}},
        resolve: async (_, {id, dto}: ChangeUser, {prisma}: GqlContext) => {
            return await prisma.user.update({where: {id}, data: dto});
        }
    },
    deleteUser: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_, {id}: User, {prisma}: GqlContext) => {
            await prisma.user.delete({where: {id}});

            return null;
        }
    },
    subscribeTo: {
        type: UserType,
        args: {userId: {type: UUIDNonNullType}, authorId: {type: UUIDNonNullType}},
        resolve: async (_, {userId, authorId}: Subscription, {prisma}: GqlContext) => {
            return await prisma.user.update({where: {id: userId}, data: {userSubscribedTo: {create: {authorId}}}});
        }
    },
    unsubscribeFrom: {
        type: GraphQLBoolean,
        args: {userId: {type: UUIDNonNullType}, authorId: {type: UUIDNonNullType}},
        resolve: async (_, {userId, authorId}: Subscription, {prisma}: GqlContext) => {
            await prisma.subscribersOnAuthors.delete({
                where: {
                    subscriberId_authorId: {
                        subscriberId: userId,
                        authorId
                    }
                }
            });

            return true;
        }
    }
};

const PostMutationQueries = {
    createPost: {
        type: PostType,
        args: {dto: {type: CreatePostNonNullType}},
        resolve: async (_, {dto}: CreatePost, {prisma}: GqlContext) => {
            return await prisma.post.create({data: dto});
        }
    },
    changePost: {
        type: PostType,
        args: {id: {type: UUIDNonNullType}, dto: {type: ChangePostNonNullType}},
        resolve: async (_, {id, dto}: ChangePost, {prisma}: GqlContext) => {
            return await prisma.post.update({where: {id}, data: dto});
        }
    },
    deletePost: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_, {id}: Post, {prisma}: GqlContext) => {
            await prisma.post.delete({where: {id}});

            return null;
        }
    }
};

const ProfileMutationQueries = {
    createProfile: {
        type: ProfileType,
        args: {dto: {type: CreateProfileNonNullType}},
        resolve: async (_, {dto}: CreateProfile, {prisma}: GqlContext) => {
            return await prisma.profile.create({data: dto});
        }
    },
    changeProfile: {
        type: ProfileType,
        args: {id: {type: UUIDNonNullType}, dto: {type: ChangeProfileNonNullType}},
        resolve: async (_, {id, dto}: ChangeProfile, {prisma}: GqlContext) => {
            return await prisma.profile.update({where: {id}, data: dto});
        }
    },
    deleteProfile: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_, {id}: Profile, {prisma}: GqlContext) => {
            await prisma.profile.delete({where: {id}});

            return null;
        },
    }
};

export const MutationQueries: GraphQLObjectType = new GraphQLObjectType({
    name: 'MutationQueries',
    fields: () => ({
        ...UserMutationQueries,
        ...PostMutationQueries,
        ...ProfileMutationQueries
    })
});
