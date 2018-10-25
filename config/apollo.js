import { HttpLink, InMemoryCache } from "apollo-boost";

export const ApolloConfig = {
    link: new HttpLink({uri: 'https://h2h-dev.taher.io/graphql/'}),
    cache: new InMemoryCache()
};