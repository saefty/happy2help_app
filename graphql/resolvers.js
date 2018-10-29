import gql from 'graphql-tag';

export const Resolvers = {
    Mutation: {
        setJWT: async (_, { jwt }, { cache }) => {
            const query = gql`
                query {
                    JWT @client
                }
            `;
            await cache.writeQuery({
                query,
                data: { JWT: jwt },
            });
            return { JWT: jwt };
        },
    },
};
