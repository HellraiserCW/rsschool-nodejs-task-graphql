import { UUIDType } from '../types/uuid.js';
import { UsersType, UserType } from '../types/user.js';
import { User } from '../interfaces/user.interface.js'
import { GraphqlContext } from '../interfaces/app.interface.js';

export const UserQueries = {
    user: {
        type: UserType,
        args: {id: {type: UUIDType}},
        resolve: async (_: unknown, {id}: User, {prisma}: GraphqlContext) => {
            await prisma.user.findFirst({where: {id}});
        }
    },
    users: {
        type: UsersType,
        resolve: async ({prisma}: GraphqlContext) => {
            await prisma.user.findMany();
        }
    }
};
