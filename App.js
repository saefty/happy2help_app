// @flow
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { DefaultStyles } from './config/style';
import { withNamespaces } from 'react-i18next';
import { LoginForm } from './src/components/auth/login.form';

Sentry.config(SentryConfig.link, SentryConfig.props);

if (!global.__DEV__) {
    Sentry.install();
}

type Props = {
    t: i18n.t,
};
class App extends Component<Props> {
    componentDidMount() {
        Sentry.captureBreadcrumb({
            message: 'Test msg',
            category: 'start',
            data: { some: 'data', as: 'json' },
        });
    }
    render() {
        return (
            <View style={DefaultStyles.container}>
                <Query
                    query={gql`
                        query {
                            JWT @client
                            user {
                                edges {
                                    node {
                                        username
                                        email
                                    }
                                }
                            }
                        }
                    `}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>{error.message}</Text>;
                        let username;
                        if(data.user) {
                            username = <Text>{data.user.edges[0].node.username} {data.user.edges[0].node.email}</Text>
                        }
                        return (
                            <View>
                                {username}
                                <Text>{JSON.stringify(data.JWT)}</Text>
                            </View>
                        );
                    }}
                </Query>
                <Text style={DefaultStyles.welcome}>
                    {this.props.t('welcome')}
                </Text>
            </View>
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);
