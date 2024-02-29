export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface CreatePost {
    data: {
        authorId: string;
        title: string;
        content: string;
    };
}

export interface ChangePost extends CreatePost {
    id: string;
}
