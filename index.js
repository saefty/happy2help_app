/** @format */
// @flow
import React, { Component } from 'react';
import { AppRegistry, Button } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloConfig } from './config/apollo';
import RNLanguages from 'react-native-languages';

import './i18n/i18n';
import {
    I18nextProvider,
    withNamespaces,
    NamespacesConsumer,
} from 'react-i18next';
import i18n from './i18n/i18n';

type I18nProps = {
    t: i18n.t,
};

export default class AppApollo extends Component<I18nProps> {
    constructor(props) {
        super(props);
        this.state = { apolloClient: new ApolloClient(ApolloConfig) };

        RNLanguages.addEventListener('change', this.onLanguageChange);
        console.log(this.props);
    }

    onLanguageChange(language) {
        if (i18n.language === 'de') {
            i18n.changeLanguage('en');
        } else {
            i18n.changeLanguage('de');
        }
        console.log(i18n.language);
    }

    render() {
        return (
            <ApolloProvider
                client={this.state.apolloClient}
                screenProps={this.props.t}
            >
                <App />
                <Button
                    onPress={() => {
                        this.onLanguageChange('de');
                    }}
                    title={this.props.t('title')}
                />
            </ApolloProvider>
        );
    }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(AppApollo);

AppRegistry.registerComponent(appName, () => ReloadAppOnLanguageChange);
