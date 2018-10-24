/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Sentry } from 'react-native-sentry';
import { SentryLog } from 'react-native-sentry';

Sentry.config('https://62202530116e405e9bdf7dca8a105ecd@sentry.io/1303411', {logLevel: SentryLog.Verbose })

if (!global.__DEV__) {
  Sentry.install();
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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

      return data.allUsers.edges.map((user)=> <Text key={user.node.id}>{user.node.username}</Text>);
    }}
  </Query>
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    Sentry.captureBreadcrumb({message: 'Test msg', category: 'start', data: { some: 'data', as: 'json' }});
    return (
      <View style={styles.container}>
        <TestQuery></TestQuery>
        <Text style={styles.welcome}>Welcome to Happy to Help...!</Text>
        <Image source={require('./assets/imgs/h2h_app.png')}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
