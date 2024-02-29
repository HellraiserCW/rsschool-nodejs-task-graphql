export interface User {
    id: string;
    name: string;
    balance: number;
    userSubscribedTo: {
        subscriberId: string;
        authorId: string;
    }[];
    subscribedToUser: {
        subscriberId: string;
        authorId: string;
    }[];
}

export interface CreateUser {
    data: {
        name: string;
        balance: number;
    };
}

export interface ChangeUser extends CreateUser {
    id: string;
}

export interface Subscriber {
    id: string;
    authorId: string;
}
