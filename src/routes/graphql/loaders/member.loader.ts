import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { Member } from '../interfaces/member.interface.js';

const getMemberType = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const members: Member[] = await prisma.memberType.findMany({
            where: {id: {in: userIDs}}
        });
        const mappedMembers: Map<string, Member> = new Map(members.map((member) => [member.id, member]));

        return userIDs.map((id) => mappedMembers.get(id));
    };
};

export const memberLoader = (prisma: PrismaClient) => new DataLoader(getMemberType(prisma));
