import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { Profile } from '../interfaces/profile.interface.js';

const getProfiles = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const profiles: Profile[] = await prisma.profile.findMany({
            where: {userId: {in: userIDs}}
        });
        const profileMap: Map<string, Profile> = new Map(profiles.map((profile) => [profile.userId, profile]));

        return userIDs.map((id) => profileMap.get(id));
    };
};

export const profileLoader = (prisma: PrismaClient) => new DataLoader(getProfiles(prisma));
