// @flow
import React, { Component } from 'react';
import { withNamespaces, i18n } from 'react-i18next';
import { AppContainer } from './src/components/navigation/navigation';

type Props = {
    t: i18n.t,
    logOut: () => void,
};
class App extends Component<Props> {
    render() {
        return (
            <AppContainer
                screenProps={{
                    logOut: this.props.logOut,
                }}
            />
            //new react navigation tab navigator
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);
