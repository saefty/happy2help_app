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
import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { print } from 'graphql/language/printer';
import Config from 'react-native-config';
import { Sentry } from 'react-native-sentry';

export const createApolloConfiguration = async () => {
    // This is the same cache you pass into new ApolloClient
    const cache = new InMemoryCache();
    const cfg = {
        cache,
        resolvers: Resolvers,
        typeDefs: TypeDefs,
        defaults: Defaults,
    };

    const stateLink = withClientState(cfg);

    await persistCache({
        cache,
        storage: AsyncStorage,
        trigger: 'background',
        maxSize: 1048576 * 100, // 100 MB
        debug: true, // enables console logging
    });

    const CreateHeaderLink = setContext(async (_, { headers, cache }) => {
        let result = '';
        try {
            // retrieve the JWT token form cache
            result = await cache.readQuery({
                query: gql`
                    query {
                        JWT @client
                    }
                `,
            });
        } catch (E) {} // eslint-disable-line

        // get the authentication token from local storage if it exists
        const token = result && result.JWT ? result.JWT : '';
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `JWT ${token}` : '',
            },
        };
    });

    const errorLink = onError(({ graphQLErrors }) => {
        if (graphQLErrors)
            graphQLErrors.map(error => {
                Sentry.captureException('GraphQL Error: ', error); // eslint-disable-line
            });
    });

    const serverURI = Config.DEV_SERVER === 'true' ? 'http://localhost:3000/graphql/' : 'https://h2h-dev.taher.io/graphql/';
    Sentry.captureMessage('URL set to', serverURI); // eslint-disable-line
    const uploadLink = createUploadLink({ uri: serverURI });

    const consoleLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            console.log({ query: print(operation.query), operation, response });
            return response;
        });
    });
    const Links = [consoleLink, errorLink, CreateHeaderLink, stateLink, uploadLink];

    const defaultOptions = {};

    return {
        cache,
        link: ApolloLink.from(Links),
        defaultOptions,
    };
};
