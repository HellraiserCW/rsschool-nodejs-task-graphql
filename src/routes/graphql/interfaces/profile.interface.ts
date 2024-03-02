export interface Profile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
}

export interface CreateProfile {
    dto: {
        userId: string;
        memberTypeId: string;
        isMale: boolean;
        yearOfBirth: number;
    };
}

export interface ChangeProfile extends CreateProfile {
    id: string;
}
