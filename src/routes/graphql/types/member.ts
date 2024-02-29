import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql/type/index.js';
import { Member } from '../interfaces/member.interface.js';
import { GraphqlContext } from '../interfaces/app.interface.js';
import { ProfilesType } from './profile.js';

enum MemberTypes {
    Basic = 'basic',
    Business = 'business'
}

export const MemberId: GraphQLEnumType = new GraphQLEnumType({
    name: 'MemberId',
    values: {
        basic: {
            value: MemberTypes.Basic,
        },
        business: {
            value: MemberTypes.Business,
        },
    },
});

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: {type: MemberId},
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt},
        profiles: {
            type: ProfilesType,
            resolve: async ({id}: Member, {prisma}: GraphqlContext): Promise<void> => {
                await prisma.profile.findMany({where: {memberTypeId: id}});
            }
        }
    })
});

export const MemberIdType: GraphQLNonNull<GraphQLEnumType> = new GraphQLNonNull(MemberId);

export const MembersType: GraphQLList<GraphQLObjectType> = new GraphQLList(MemberType);
