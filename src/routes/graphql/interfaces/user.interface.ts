import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType } from 'graphql/type/index.js';
import { GraphQLScalarType } from 'graphql';
import { GraphqlContext } from './app.interface.js';

export interface User {
    id: string;
    name: string;
    balance: number;
    userSubscribedTo: {
        subscriberId: string;
        authorId: string;
    }[];
    subscribedToUser: {
        subscriberId: string;
        authorId: string;
    }[];
}

export interface CreateUser {
    data: {
        name: string;
        balance: number;
    };
}

export interface ChangeUser extends CreateUser {
    id: string;
}

interface ResolverFunction<TSource, TArgs, TContext, TReturn> {
    (
        source: TSource,
        args: TArgs,
        context: TContext,
        info: TReturn
    ): TReturn | Promise<TReturn>;
}

export interface UserQuery {
    [key: string]: {
        type: GraphQLObjectType | GraphQLList<GraphQLObjectType> | GraphQLScalarType;
        args?: {
            id?: {
                type: GraphQLScalarType;
            };
            data?: {
                type: GraphQLInputObjectType;
            };
        };
        resolve: ResolverFunction<any, any, GraphqlContext, any>;
    }
}
