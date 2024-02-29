import { Member } from '../interfaces/member.interface.js';
import { GraphqlContext, Query } from '../interfaces/app.interface.js';
import { MemberIdType, MembersType, MemberType } from '../types/member.js';

export const MemberQueries: Query = {
    memberType: {
        type: MemberType,
        args: {id: {type: MemberIdType}},
        resolve: async (_: unknown, {id}: Member, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.memberType.findFirst({where: {id}});
        }
    },
    memberTypes: {
        type: MembersType,
        resolve: async ({prisma}: GraphqlContext): Promise<void> => {
            await prisma.memberType.findMany();
        }
    }
};
