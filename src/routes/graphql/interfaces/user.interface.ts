export interface User {
    id: string;
    name: string;
    balance: number;
    userSubscribedTo?: {
        subscriberId: string;
        authorId: string;
    }[];
    subscribedToUser?: {
        subscriberId: string;
        authorId: string;
    }[];
}

export type Subscriptions = {
    subscribedToUser: {
        subscriberId: string;
        authorId: string;
    }[];
} & User;

export type Subscribers = {
    userSubscribedTo: {
        subscriberId: string;
        authorId: string;
    }[];
} & User;

export interface Subscription {
    userId: string;
    authorId: string;
}

export interface CreateUser {
    dto: {
        name: string;
        balance: number;
    };
}

export interface ChangeUser extends CreateUser {
    id: string;
}
