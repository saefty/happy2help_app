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
        setORGANISATION_ID: async (_, { ORGANISATION_ID }, { cache }) => {
            const query = gql`
                query {
                    ORGANISATION_ID @client
                }
            `;
            await cache.writeQuery({
                query,
                data: { ORGANISATION_ID: ORGANISATION_ID },
            });
            return { ORGANISATION_ID: ORGANISATION_ID };
        },
    },
};
