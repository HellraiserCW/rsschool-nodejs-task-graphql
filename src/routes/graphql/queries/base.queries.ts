import { GraphQLObjectType, GraphQLResolveInfo } from 'graphql';
import {
    ResolveTree,
    parseResolveInfo,
    simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

import { UsersType, UserType } from '../types/user.js';
import { UUIDNonNullType } from '../types/uuid.js';
import { Subscribers, Subscriptions, User } from '../interfaces/user.interface.js';
import { PostsType, PostType } from '../types/post.js';
import { Post } from '../interfaces/post.interface.js';
import { MemberIdNonNullType, MembersType, MemberType } from '../types/member.js';
import { Member } from '../interfaces/member.interface.js';
import { ProfilesType, ProfileType } from '../types/profile.js';
import { Profile } from '../interfaces/profile.interface.js';
import { GqlContext } from '../interfaces/app.interface.js';

const UserQueries = {
    user: {
        type: UserType,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_p, {id}: User, {prisma}: GqlContext) => {
            return await prisma.user.findUnique({where: {id}});
        }
    },
    users: {
        type: UsersType,
        resolve: async (_p, _a, { prisma, loaders: { userSubscribedToLoader, subscribedToUserLoader } }: GqlContext, info: GraphQLResolveInfo) => {
            const parsedResolveInfoFragment: ResolveTree = parseResolveInfo(info) as ResolveTree;
            const { fields } = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, info.returnType);
            const subscriptions: boolean = 'subscribedToUser' in fields;
            const subscribers: boolean = 'userSubscribedTo' in fields;
            const users = await prisma.user.findMany({
                include: {subscribedToUser: subscriptions, userSubscribedTo: subscribers}
            });

            if (subscriptions || subscribers) {
                const mappedUsers: Map<string, Subscriptions | Subscribers> = new Map<string, Subscriptions | Subscribers>(
                    users.map((user) => [user.id, user])
                );

                users.forEach((user) => {
                    if (subscriptions) {
                        subscribedToUserLoader.prime(
                            user.id,
                            user.subscribedToUser.map(({ subscriberId }) => mappedUsers.get(subscriberId) as Subscriptions)
                        );
                    }

                    if (subscribers) {
                        userSubscribedToLoader.prime(
                            user.id,
                            user.userSubscribedTo.map(({ authorId }) => mappedUsers.get(authorId) as Subscribers),
                        );
                    }
                });
            }

            return users;
        }
    }
};

const MemberQueries = {
    memberType: {
        type: MemberType,
        args: {id: {type: MemberIdNonNullType}},
        resolve: async (_, {id}: Member, {prisma}: GqlContext) => {
            return await prisma.memberType.findUnique({where: {id}});
        }
    },
    memberTypes: {
        type: MembersType,
        resolve: async (_p, _a, {prisma}: GqlContext) => {
            return await prisma.memberType.findMany();
        }
    }
};

const PostQueries = {
    post: {
        type: PostType,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_p, {id}: Post, {prisma}: GqlContext) => {
            return await prisma.post.findUnique({where: {id}});
        }
    },
    posts: {
        type: PostsType,
        resolve: async (_p, _a, {prisma}: GqlContext) => {
            return await prisma.post.findMany();
        }
    }
};

const ProfileQueries = {
    profile: {
        type: ProfileType,
        args: {id: {type: UUIDNonNullType}},
        resolve: async (_p, {id}: Profile, {prisma}: GqlContext) => {
            return await prisma.profile.findUnique({where: {id}});
        }
    },
    profiles: {
        type: ProfilesType,
        resolve: async (_p, _a, {prisma}: GqlContext) => {
            return await prisma.profile.findMany();
        }
    }
};

export const BaseQuery = new GraphQLObjectType({
    name: 'BaseQuery',
    fields: () => ({
        ...UserQueries,
        ...MemberQueries,
        ...PostQueries,
        ...ProfileQueries
    })
});
