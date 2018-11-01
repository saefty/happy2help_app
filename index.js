/** @format */
// @flow
import React, { Component } from 'react';
import { AppRegistry, View, AsyncStorage } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createApolloConfiguration } from './config/apollo';
import RNLanguages from 'react-native-languages';

import './i18n/i18n';
import { withNamespaces } from 'react-i18next';
import i18n from './i18n/i18n';
import gql from 'graphql-tag';
import SplashScreen from 'react-native-splash-screen';
import { AuthScreen } from './src/screens/auth.screen';
import { H2HTheme } from './themes/default.theme';

type I18nProps = {
    t: i18n.t,
};

export default class AppApollo extends Component<I18nProps> {
    state = {
        apolloClient: undefined,
        loggedIn: true, // Be optimistic and hope the user is logged in
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
        await this.setState({
            loggedIn: await this.verifyLogin(),
        });
        SplashScreen.hide();
    }

    verifyLogin = async (): boolean => {
        // Get JWT
        const result = await this.state.apolloClient.query({
            query: gql`
                query {
                    JWT @client
                }
            `,
        });
        const token = result.data.JWT;
        if (token && token !== '') {
            // Verify the token
            const verification = await this.state.apolloClient.mutate({
                mutation: gql`
                    mutation verify($token: String) {
                        verifyToken(token: $token) {
                            payload
                        }
                    }
                `,
                variables: { token },
            });
            const result = verification.data.verifyToken.payload;
            if (result.username && result.exp && result.orig_iat) {
                return true;
            }
        }
        return false;
    };

    logIn = async (jwt: string) => {
        // Clear storages (password would be cached in the store if it would not be cleared)
        await AsyncStorage.clear();
        await this.state.apolloClient.resetStore();
        // Save the JWT value in the apollo cache
        await this.state.apolloClient.mutate({
            mutation: gql`
                mutation SetJWT($jwt: String) {
                    setJWT(jwt: $jwt) @client
                }
            `,
            variables: { jwt },
        });
        // Clear login state
        await this.setState({
            loggedIn: await this.verifyLogin(),
        });
    };

    logOut = async () => {
        // Clear storages
        await AsyncStorage.clear();
        await this.state.apolloClient.resetStore();
        // Clear login state
        await this.setState({
            loggedIn: false,
        });
    };

    onLanguageChange(language) {
        // eslint-disable-line
        // i18n.changeLanguage(language);
        if (i18n.language === 'de') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('de');
        }
    }

    render() {
        // Blank screen if apollo was not started
        if (!this.state.apolloClient) return <View />;
        let path;
        if (this.state.loggedIn === false) {
            path = <AuthScreen logIn={this.logIn} logOut={this.logOut} />;
        } else {
            path = <App logOut={this.logOut} />;
        }

        return (
            <PaperProvider theme={H2HTheme}>
                <ApolloProvider
                    client={this.state.apolloClient}
                    screenProps={this.props.t}
                >
                    {path}
                </ApolloProvider>
            </PaperProvider>
        );
    }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(AppApollo);

AppRegistry.registerComponent(appName, () => ReloadAppOnLanguageChange);
