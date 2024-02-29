import { GraphQLBoolean } from 'graphql/type/index.js';
import { UUIDType } from '../types/uuid.js';
import { ChangeUserType, CreateUserType, UsersType, UserType } from '../types/user.js';
import { ChangeUser, CreateUser, User } from '../interfaces/user.interface.js'
import { GraphqlContext, Query } from '../interfaces/app.interface.js';

export const UserQueries: Query = {
    user: {
        type: UserType,
        args: {id: {type: UUIDType}},
        resolve: async (_: unknown, {id}: User, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.user.findFirst({where: {id}});
        }
    },
    users: {
        type: UsersType,
        resolve: async ({prisma}: GraphqlContext): Promise<void> => {
            await prisma.user.findMany();
        }
    },
    createUser: {
        type: UserType,
        args: {data: {type: CreateUserType}},
        resolve: async (_: unknown, {data}: CreateUser, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.user.create({data});
        }
    },
    changeUser: {
        type: UserType,
        args: {id: {type: UUIDType}, data: {type: ChangeUserType}},
        resolve: async (_: unknown, {id, data}: ChangeUser, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.user.update({where: {id}, data});
        }
    },
    deleteUser: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDType}},
        resolve: async (_: unknown, {id}: User, {prisma}: GraphqlContext): Promise<boolean> => {
            try {
                await prisma.user.delete({where: {id}});
            } catch {
                return false;
            }

            return true;
        }
    }
};
