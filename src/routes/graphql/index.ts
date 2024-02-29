import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';

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
            const validationErrors = validate(schema, queryDocNode, [depthLimit(5)]);

            if (validationErrors.length > 0) {
                return {data: '', errors: validationErrors};
            }

            const {data, errors} = await graphql({
                schema,
                source,
                variableValues,
                contextValue: {prisma}
            });

            return {data, errors};
        }
    });
};

export default plugin;
