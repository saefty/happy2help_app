// @flow
import React, { Component } from 'react';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
import { withNamespaces, i18n } from 'react-i18next';
import { AppContainer } from './src/components/navigation/navigation';
import { EditEventFormNamespaced } from './src/components/event/edit.event.form';

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
            <AppContainer screenProps={{
                logOut: this.props.logOut,
            }} /> //new react navigation tab navigator    
            
           // <I18nNavigation logOut={this.props.logOut} /> //old paper bottom navigation
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);
