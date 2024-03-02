import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { dataLoaders } from './loaders/main.loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
    const {prisma} = fastify;

    fastify.route({
        url: '/',
        method: 'POST',
        schema: {
            ...createGqlResponseSchema,
            response: {
                200: gqlResponseSchema,
            },
        },
        async handler(req) {
            const {query: source, variables: variableValues} = req.body;
            const queryDocNode = parse(source);
            const graphQLErrors = validate(schema, queryDocNode, [depthLimit(5)]);

            if (graphQLErrors.length) {
                return {data: '', errors: graphQLErrors};
            }

            const {data, errors} = await graphql({
                schema,
                source,
                variableValues,
                contextValue: {
                    prisma,
                    loaders: dataLoaders(prisma)
                }
            });

            return {data, errors};
        }
    });
};

export default plugin;
