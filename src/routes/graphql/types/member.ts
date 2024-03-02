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

export const MemberId: GraphQLEnumType = new GraphQLEnumType({
    name: 'MemberId',
    values: {
        basic: {value: MemberTypes.Basic},
        business: {value: MemberTypes.Business},
    }
});

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: {type: MemberId},
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt},
    })
});

export const MemberIdNonNullType: GraphQLNonNull<GraphQLEnumType> = new GraphQLNonNull(MemberId);

export const MembersType: GraphQLList<GraphQLObjectType> = new GraphQLList(MemberType);
