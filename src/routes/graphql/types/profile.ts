import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType
} from 'graphql/type/index.js';
import { Profile } from '../interfaces/profile.interface.js';
import { GraphqlContext } from '../interfaces/app.interface.js';
import { MemberId, MemberType } from './member.js';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {type: UUIDType},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt},
        userId: {type: UUIDType},
        user: {
            type: UserType,
            resolve: async ({userId}: Profile, {prisma}: GraphqlContext): Promise<void> => {
                await prisma.user.findFirst({where: {id: userId}});
            }
        },
        memberTypeId: {type: MemberId},
        memberType: {
            type: MemberType,
            resolve: async ({memberTypeId}: Profile, {prisma}: GraphqlContext): Promise<void> => {
                await prisma.memberType.findFirst({where: {id: memberTypeId}});
            }
        }
    })
});

export const ProfilesType: GraphQLList<GraphQLObjectType> = new GraphQLList(ProfileType);

export const CreateProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateProfile',
    fields: () => ({
        userId: {type: UUIDType},
        memberTypeId: {type: MemberId},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt}
    })
});

export const ChangeProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeProfile',
    fields: () => ({
        memberTypeId: {type: MemberId},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt}
    })
});
