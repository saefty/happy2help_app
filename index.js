/** @format */
// @flow
import React, { Component } from 'react';
import { AppRegistry, View, AsyncStorage, PermissionsAndroid } from 'react-native';
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
import { requestPermission } from './src/helpers/requestPermission';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { AppState, Platform } from 'react-native';
import moment from 'moment';
import 'moment/locale/de';

type I18nProps = {
    t: i18n.t,
};
type State = {
    apolloClient: ApolloClient,
    loggedIn: boolean,
    appState: AppState.AppStateStatic,
};

Sentry.config(SentryConfig.link, SentryConfig.props);
if (!global.__DEV__) {
    Sentry.install();
}

export default class AppApollo extends Component<I18nProps, State> {
    state = {
        apolloClient: {},
        loggedIn: false, // Be optimistic and hope the user is logged in
        appState: AppState.currentState,
    };

    constructor(props: I18nProps) {
        super(props);  
        this.setUpMoment();
        RNLanguages.addEventListener('change', this.onLanguageChange);
    }
    setUpMoment() {
        moment.updateLocale('de', {
            monthsShort : [
                "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
                "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ]
        });
        moment.locale(RNLanguages.language === 'de-DE' ? 'de' : 'en');
    }
    async componentDidMount() {
        if (Platform.OS !== 'ios') {
            await requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            await requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        }
        AppState.addEventListener('change', this._handleAppStateChange);

        const cfg = await createApolloConfiguration();

        await this.setState({
            apolloClient: new ApolloClient(cfg),
        });
        await this.setState({
            loggedIn: await this.verifyLogin(),
        });
        SplashScreen.hide();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            SplashScreen.hide();
        } else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
            SplashScreen.show();
        }
        this.setState({ appState: nextAppState });
    };

    verifyLogin = async (): Promise<boolean> => {
        // Get JWT
        const result = await this.state.apolloClient.query({
            query: gql`
                query {
                    JWT @client
                }
            `,
            fetchPolicy: 'cache-only',
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
        // Clear login state
        await this.setState({
            loggedIn: false,
        });
        // Clear storages
        await AsyncStorage.clear();
        await this.state.apolloClient.resetStore();
    };

    onLanguageChange(language: any) {
        // eslint-disable-line
        // i18n.changeLanguage(language);
        if (i18n.language === 'de-DE') {
            i18n.changeLanguage('de');
            moment.locale('de');
        } else {
            i18n.changeLanguage('en');
            moment.locale('en');
        }
    }

    render() {
        // Blank screen if apollo was not started
        if (!this.state.apolloClient.query) return <View />;
        let path;
        if (this.state.loggedIn === false) {
            path = <AuthScreen logIn={this.logIn} logOut={this.logOut} />;
        } else {
            path = <App logOut={this.logOut} />;
        }

        return (
            <PaperProvider theme={H2HTheme}>
                <ApolloProvider client={this.state.apolloClient} screenProps={this.props.t}>
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
