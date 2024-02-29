import { PrismaClient } from '@prisma/client';
import {
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql/type/index.js';
import { GraphQLScalarType } from 'graphql/index.js';

export interface GraphqlContext {
    prisma: PrismaClient;
}

interface ResolverFunction<TSource, TArgs, TContext, TReturn> {
    (
        source: TSource,
        args: TArgs,
        context: TContext,
        info: TReturn
    ): TReturn | Promise<TReturn>;
}

export interface Query {
    [key: string]: {
        type: GraphQLObjectType | GraphQLList<GraphQLObjectType> | GraphQLScalarType;
        args?: {
            id?: {
                type: GraphQLScalarType | GraphQLNonNull<GraphQLEnumType>;
            };
            data?: {
                type: GraphQLInputObjectType;
            };
            authorId?: {
                type: GraphQLScalarType;
            };
        };
        resolve: ResolverFunction<any, any, GraphqlContext, any>;
    }
}
