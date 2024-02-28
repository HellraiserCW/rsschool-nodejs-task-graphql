import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify; // prisma from fastify
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        // 200: gqlResponseSchema,
      },
    },
    async handler(req) {
      // do stuff req.body
      return await prisma.user.findMany();
      // return {};
      // for n + 1 problem use 'in' operator
    },
  });
};

export default plugin;
