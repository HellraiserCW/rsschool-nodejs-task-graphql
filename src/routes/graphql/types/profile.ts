import { GraphQLNonNull } from 'graphql';

import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType
} from 'graphql/type/index.js';
import { Profile } from '../interfaces/profile.interface.js';
import { MemberIdNonNullType, MemberType, MemberTypeId } from './member.js';
import { UUIDNonNullType, UUIDType } from './uuid.js';
import { GqlContext } from '../interfaces/app.interface.js';

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {type: UUIDType},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt},
        userId: {type: UUIDType},
        memberTypeId: {type: MemberTypeId},
        memberType: {
            type: MemberType,
            resolve: async ({memberTypeId}: Profile, _, {loaders: {memberTypeLoader}}: GqlContext) => {
                return await memberTypeLoader.load(memberTypeId);
            }
        }
    })
});

export const ProfilesType: GraphQLList<GraphQLObjectType> = new GraphQLList(ProfileType);

export const CreateProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateProfile',
    fields: () => ({
        userId: {type: UUIDNonNullType},
        memberTypeId: {type: MemberIdNonNullType},
        isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
        yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)}
    })
});

export const ChangeProfileType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeProfile',
    fields: () => ({
        memberTypeId: {type: MemberTypeId},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: GraphQLInt}
    })
});

export const CreateProfileNonNullType: GraphQLNonNull<GraphQLInputObjectType> = new GraphQLNonNull(CreateProfileType);

export const ChangeProfileNonNullType: GraphQLNonNull<GraphQLInputObjectType> = new GraphQLNonNull(ChangeProfileType);
