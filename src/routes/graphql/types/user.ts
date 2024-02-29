import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { UUIDType } from './uuid.js';
import { User } from '../interfaces/user.interface.js';
import { GraphqlContext } from '../interfaces/app.interface.js';
import { ProfileType } from './profile.js';
import { PostsType } from './post.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat},
        profile: {
            type: ProfileType,
            resolve: async ({id}: User, {prisma}: GraphqlContext) => {
                await prisma.profile.findFirst({where: {userId: id}});
            }
        },
        posts: {
            type: PostsType,
            resolve: async ({id}: User, {prisma}: GraphqlContext) => {
                await prisma.post.findMany({where: {authorId: id}});
            }
        },
        userSubscribedTo: {
            type: UsersType,
            resolve: async ({id}: User, {prisma}: GraphqlContext) => {
                const queryResult = await prisma.subscribersOnAuthors.findMany({
                    where: {subscriberId: id},
                    select: {author: true},
                });

                return queryResult.map((result) => result.author);
            },
        },
        subscribedToUser: {
            type: UsersType,
            resolve: async ({id}: User, {prisma}: GraphqlContext) => {
                const queryResult = await prisma.subscribersOnAuthors.findMany({
                    where: {authorId: id},
                    select: {subscriber: true},
                });

                return queryResult.map((result) => result.subscriber);
            }
        }
    })
});

export const UsersType: GraphQLList<GraphQLObjectType> = new GraphQLList(UserType);

export const CreateUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateUserType',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        balance: {type: new GraphQLNonNull(GraphQLFloat)}
    })
});

export const ChangeUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeUserType',
    fields: () => ({
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat}
    })
});
