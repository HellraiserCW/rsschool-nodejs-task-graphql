import { GraphqlContext, Query } from '../interfaces/app.interface.js';
import { UUIDType } from '../types/uuid.js';
import { GraphQLBoolean } from 'graphql/type/index.js';
import { ChangeProfileType, CreateProfileType, ProfilesType, ProfileType } from '../types/profile.js';
import { ChangeProfile, CreateProfile, Profile } from '../interfaces/profile.interface.js';

export const ProfileQueries: Query = {
    profile: {
        type: ProfileType,
        args: {id: {type: UUIDType}},
        resolve: async (_parent, {id}: Profile, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.profile.findFirst({where: {id}});
        }
    },
    profiles: {
        type: ProfilesType,
        resolve: async ({prisma}: GraphqlContext): Promise<void> => {
            await prisma.profile.findMany({});
        }
    },
    createProfile: {
        type: ProfileType,
        args: {data: {type: CreateProfileType}},
        resolve: async (_parent, {data}: CreateProfile, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.profile.create({data});
        }
    },
    changeProfile: {
        type: ProfileType,
        args: {id: {type: UUIDType}, data: {type: ChangeProfileType}},
        resolve: async (_parent, {id, data}: ChangeProfile, {prisma}: GraphqlContext): Promise<void> => {
            await prisma.profile.update({where: {id}, data});
        }
    },
    deleteProfile: {
        type: GraphQLBoolean,
        args: {id: {type: UUIDType}},
        resolve: async (_parent, {id}: Profile, {prisma}: GraphqlContext): Promise<boolean> => {
            try {
                await prisma.profile.delete({where: {id}});
            } catch {
                return false;
            }

            return true;
        },
    }
};
