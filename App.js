// @flow
import React, { Component } from 'react';
import { withNamespaces, i18n } from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import { View } from 'react-native';
import { AppContainer } from './src/components/navigation/navigation';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

export const LogOutProvider = React.createContext({
    logOut: () => {
        console.warn('not set');
    },
});

class App extends Component<Props> {
    render() {
        return (
            <LogOutProvider.Provider
                value={{
                    logOut: this.props.logOut,
                }}
            >
                <View style={{ flex: 1 }}>
                    <AppContainer />
                    <FlashMessage position="top" />
                </View>
            </LogOutProvider.Provider>
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);
