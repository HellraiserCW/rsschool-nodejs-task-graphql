import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';

import { BaseQuery } from './queries/base.queries.js';
import { MutationQueries } from './queries/mutation.queries.js';

export const gqlResponseSchema = Type.Partial(
    Type.Object({
        data: Type.Any(),
        errors: Type.Any(),
    }),
);

export const createGqlResponseSchema = {
    body: Type.Object(
        {
            query: Type.String(),
            variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
        },
        {
            additionalProperties: false,
        },
    ),
};

export const schema: GraphQLSchema = new GraphQLSchema({query: BaseQuery, mutation: MutationQueries});
