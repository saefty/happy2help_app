// @flow
import { Defaults } from '../graphql/defaults';
import { Resolvers } from '../graphql/resolvers';
import { TypeDefs } from '../graphql/typeDefs';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';

export const createApolloConfiguration = async (jwt: string) => {
    // This is the same cache you pass into new ApolloClient
    const cache = new InMemoryCache();

    const stateLink = withClientState({
        cache,
        resolvers: Resolvers,
        typeDefs: TypeDefs,
        defaults: Defaults,
    });

    await persistCache({
        cache,
        storage: AsyncStorage,
        trigger: 'background',
        maxSize: 1048576 * 100, // 100 MB
        debug: true // enables console logging
    })

    const CreateHeaderLink = jwt => {
        return setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = jwt;
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `JWT ${token}` : '',
                },
            };
        });
    };

    const Links = [
        CreateHeaderLink(jwt),
        stateLink,
        new HttpLink({
            uri: 'https://h2h-dev.taher.io/graphql/',
        }),
    ];

    return {
        cache,
        link: ApolloLink.from(Links),
    };
};
