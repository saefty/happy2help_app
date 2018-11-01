// @flow
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { DefaultStyles } from './config/style';
import { withNamespaces } from 'react-i18next';
import { Button } from 'react-native-paper';

Sentry.config(SentryConfig.link, SentryConfig.props);

if (!global.__DEV__) {
    Sentry.install();
}

type Props = {
    t: i18n.t,
    logOut: () => void,
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
                            allUsers {
                                id
                                username
                                email
                            }
                        }
                    `}
                    pollInterval={500}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <Text>Loading...</Text>;
                        if (error) return <Text>{error.message}</Text>;

                        return (
                            <View>
                                <Text>All Users:</Text>
                                {data.allUsers.map((user) => {
                                    return (
                                        <Text key={user.id}>
                                            {user.username}
                                        </Text>
                                    );
                                })}
                                <Button
                                    onPress={this.props.logOut}
                                    mode="contained"
                                >
                                    Log out
                                </Button>
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
