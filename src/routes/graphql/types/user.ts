import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { UUIDType } from './uuid.js';
import { User } from '../interfaces/user.interface.js';
import { ProfileType } from './profile.js';
import { PostsType } from './post.js';
import { GqlContext } from '../interfaces/app.interface.js';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat},
        profile: {
            type: ProfileType,
            resolve: async ({id}: User, _, {loaders: {profileLoader}}: GqlContext) => {
                return profileLoader.load(id);
            }
        },
        posts: {
            type: PostsType,
            resolve: async ({id}: User, _, {loaders: {postsLoader}}: GqlContext) => {
                return postsLoader.load(id);
            }
        },
        userSubscribedTo: {
            type: UsersType,
            resolve: async ({id}: User, _, {loaders: {userSubscribedToLoader}}: GqlContext) => {
                return userSubscribedToLoader.load(id);
            },
        },
        subscribedToUser: {
            type: UsersType,
            resolve: async ({id}: User, _, {loaders: {subscribedToUserLoader}}: GqlContext) => {
                return subscribedToUserLoader.load(id);
            }
        }
    })
});

export const UsersType: GraphQLList<GraphQLObjectType> = new GraphQLList(UserType);

export const CreateUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateUser',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        balance: {type: new GraphQLNonNull(GraphQLFloat)}
    })
});

export const ChangeUserType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeUser',
    fields: () => ({
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat}
    })
});

export const ChangeUserNonNullType: GraphQLNonNull<GraphQLInputObjectType> = new GraphQLNonNull(ChangeUserType);
