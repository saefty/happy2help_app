/** @format */
// @flow
import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, AsyncStorage } from 'react-native';
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
    }
    constructor(props) {
        super(props);
        RNLanguages.addEventListener('change', this.onLanguageChange);
        this.logIn = this.logIn.bind(this);
    }
    async componentDidMount() {
        console.log(
            JSON.parse(await AsyncStorage.getItem('apollo-cache-persist'))  
        )
        const cfg = await createApolloConfiguration()
        await this.setState({
            apolloClient: new ApolloClient(cfg),
        });
        SplashScreen.hide();
    }

    async logIn(jwt: string) {
        // configure jwt as header and set the new apollo client
        const newClient = new ApolloClient(await createApolloConfiguration(jwt));

        this.setState({
            apolloClient: newClient,
        });
        await newClient.mutate({
            mutation: gql`
                mutation UpdateJWT($jwt: String!) {
                    updateJWT(jwt: $jwt) @client
                }
            `,
            variables: { jwt },
        });

        
    }

    logOut() {
        /**
         * TODO: Reset the complete store and clean the headers in the apollo client
         */
    }

    onLanguageChange(language) {
        if (i18n.language === 'de') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('de');
        }
    }

    render() {
        if(this.state.apolloClient === undefined) return (<View><Text>Loading</Text></View>)
        return (
            <ApolloProvider
                client={this.state.apolloClient}
                screenProps={this.props.t}
            >
                <LoginFormGQL logIn={this.logIn} />
                <App />
            </ApolloProvider>
        );
    }
}
/*
const unusedBtn = (
    <TouchableOpacity
        onPress={() => {
            this.logIn(
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNhZWYudGFoZXIiLCJleHAiOjE1NDA3NzIzNzYsIm9yaWdfaWF0IjoxNTQwNzcxODE4fQ.EUpOaaJapJBd4m4z0KcXIQyeGLKxIe-YeA2Bx8mSvas'
            );
        }}
        style={style.btn}
    >
        <Text style={style.text}>{this.props.t('title')}</Text>
    </TouchableOpacity>
);*/

const ReloadAppOnLanguageChange = withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(AppApollo);

AppRegistry.registerComponent(appName, () => ReloadAppOnLanguageChange);
