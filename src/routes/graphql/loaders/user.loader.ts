import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

import { Subscribers, Subscriptions, User } from '../interfaces/user.interface.js';

const getUsers = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const users: User[] = await prisma.user.findMany({
            where: {id: {in: userIDs}}
        });
        const mappedUsers: Map<string, User> = new Map(users.map((user) => [user.id, user]));

        return userIDs.map((id) => mappedUsers.get(id));
    };
};

const getSubscribers = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const subscribers: Subscribers[] = await prisma.user.findMany({
            where: {userSubscribedTo: {some: {authorId: {in: userIDs}}}},
            include: {userSubscribedTo: true}
        });
        const subscribersById: Map<string, Subscribers[]> = subscribers.reduce((map, user) => {
            user.userSubscribedTo.forEach((subscription) => {
                const usersList: Subscribers[] = map.get(subscription.authorId) || [];

                usersList.push(user);
                map.set(subscription.authorId, usersList);
            });

            return map;
        }, new Map<string, Subscribers[]>());

        return userIDs.map((id) => subscribersById.get(id) || []);
    };
};

const getSubscriptions = (prisma: PrismaClient) => {
    return async (data: readonly string[]) => {
        const userIDs: string[] = data as string[];
        const subscriptions: Subscriptions[] = await prisma.user.findMany({
            where: {subscribedToUser: {some: {subscriberId: {in: userIDs}}}},
            include: {subscribedToUser: true},
        });
        const subscriptionsById: Map<string, Subscriptions[]> = subscriptions.reduce((map, user) => {
            user.subscribedToUser.forEach((subscription) => {
                const subscriptionsList: Subscriptions[] = map.get(subscription.subscriberId) || [];

                subscriptionsList.push(user);
                map.set(subscription.subscriberId, subscriptionsList);
            });

            return map;
        }, new Map<string, Subscriptions[]>());

        return userIDs.map((id) => subscriptionsById.get(id) || []);
    };
};

export const userLoader = (prisma: PrismaClient) => new DataLoader(getUsers(prisma));
export const subscribersLoader = (prisma: PrismaClient) => new DataLoader(getSubscribers(prisma));
export const subscriptionsLoader = (prisma: PrismaClient) => new DataLoader(getSubscriptions(prisma));
