// @flow
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { DefaultStyles } from './config/style';
import SplashScreen from 'react-native-splash-screen';
import { withNamespaces } from 'react-i18next';

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
              email
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

      return data.allUsers.edges.map((user) => <Text key={user.node.id}>{user.node.id}</Text>);
    }}
  </Query>
);

type Props = {
  t: i18n.t
};
class App extends Component<Props> {
  componentDidMount() {
      SplashScreen.hide();
  }
  render() {
    Sentry.captureBreadcrumb({ message: 'Test msg', category: 'start', data: { some: 'data', as: 'json' } });
    return (
      <View style={DefaultStyles.container}>
        <TestQuery></TestQuery>
        <Text style={DefaultStyles.welcome}>{this.props.t('welcome')}</Text>
        <Image source={require('./assets/imgs/h2h_app.png')}></Image>
      </View>
    );
  }
}
export default withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(App);