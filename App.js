// @flow
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { DefaultStyles } from './config/style';
import { withNamespaces } from 'react-i18next';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import { Navigation } from './src/components/navigation/bottomNavigation'


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
            <Navigation logOut={this.props.logOut}></Navigation>


            /*
            <View style={DefaultStyles.container}>
                <MapView
                    accessible={true}
                    style={styles.map}
                />
                <Button onPress={this.props.logOut} style={styles.logOut} mode="contained">
                    Log out
                </Button>
            </View> */
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);

var styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logOut: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
});
/*
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
                                {data.allUsers.map(user => {
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
                */
