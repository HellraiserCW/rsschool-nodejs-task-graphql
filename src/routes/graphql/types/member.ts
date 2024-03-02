import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql/type/index.js';

export enum MemberTypes {
    Basic = 'basic',
    Business = 'business'
}

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        [MemberTypes.Basic]: {value: MemberTypes.Basic},
        [MemberTypes.Business]: {value: MemberTypes.Business},
    }
});

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: {type: MemberTypeId},
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt},
    })
});

export const MemberIdNonNullType = new GraphQLNonNull(MemberTypeId);

export const MembersType: GraphQLList<GraphQLObjectType> = new GraphQLList(MemberType);
