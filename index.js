/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
    link: new HttpLink({uri: 'https://h2h-dev.taher.io/graphql/'}),
    cache: new InMemoryCache()
});


const AppApollo = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

AppRegistry.registerComponent(appName, () => AppApollo);
