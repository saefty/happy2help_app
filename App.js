// @flow
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { DefaultStyles } from './config/style';

Sentry.config(SentryConfig.link, SentryConfig.props)

if (!global.__DEV__) {
  Sentry.install();
}

const TestQuery = () => (
  <Query
    query={gql`
      {
        allUsers {
          edges {
            node {
              id
              username
              firstName
              password
            }
          }
        }
      }`
    }
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return data.allUsers.edges.map((user) => <Text key={user.node.id}>{user.node.username}</Text>);
    }}
  </Query>
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    Sentry.captureBreadcrumb({ message: 'Test msg', category: 'start', data: { some: 'data', as: 'json' } });
    return (
      <View style={DefaultStyles.container}>
        <TestQuery></TestQuery>
        <Text style={DefaultStyles.welcome}>Welcome to Happy to Help...!</Text>
        <Image source={require('./assets/imgs/h2h_app.png')}></Image>
      </View>
    );
  }
}
