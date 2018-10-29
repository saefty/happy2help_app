/** @format */
// @flow
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    AsyncStorage,
} from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createApolloConfiguration } from './config/apollo';
import RNLanguages from 'react-native-languages';

import './i18n/i18n';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n/i18n';
import gql from 'graphql-tag';
import { LoginFormGQL } from './src/components/auth/login.form';
import SplashScreen from 'react-native-splash-screen';

type I18nProps = {
    t: i18n.t,
};

const style = StyleSheet.create({
    btn: { width: '100%', justifyContent: 'center' },
    text: {
        padding: 50,
        textAlign: 'center',
        backgroundColor: '#198EBC',
        color: '#ffffff',
        fontSize: 20,
    },
});

export default class AppApollo extends Component<I18nProps> {
    state = {
        apolloClient: undefined,
    };

    constructor(props) {
        super(props);
        RNLanguages.addEventListener('change', this.onLanguageChange);
    }

    async componentDidMount() {
        const cfg = await createApolloConfiguration();

        await this.setState({
            apolloClient: new ApolloClient(cfg),
        });

        SplashScreen.hide();
    }

    logIn = async (jwt: string) => {
        // Save the JWT value in the apollo cache
        await this.state.apolloClient.mutate({
            mutation: gql`
                mutation SetJWT($jwt: String) {
                    setJWT(jwt: $jwt) @client
                }
            `,
            variables: { jwt },
        });
    };

    logOut = async () => {
        await AsyncStorage.clear();
        await this.state.apolloClient.resetStore();
    };

    onLanguageChange(language) { // eslint-disable-line
        // i18n.changeLanguage(language);
        if (i18n.language === 'de') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('de');
        }
    }

    render() {
        if (this.state.apolloClient === undefined)
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        return (
            <ApolloProvider
                client={this.state.apolloClient}
                screenProps={this.props.t}
            >
                <LoginFormGQL logIn={this.logIn} logOut={this.logOut} />
                <App />
            </ApolloProvider>
        );
    }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(AppApollo);

AppRegistry.registerComponent(appName, () => ReloadAppOnLanguageChange);
