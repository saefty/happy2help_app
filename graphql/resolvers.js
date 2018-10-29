import gql from 'graphql-tag';

export const Resolvers = {
    Mutation: {
        updateJWT: (_, { jwt }, { cache }) => {
            const data = {
                JWT: {
                    __typename: 'JWT_TOKEN',
                    value: jwt,
                },
            };
            cache.writeData({
                data,
            });
            return data;
        },
    },
};
