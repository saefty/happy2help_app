// @flow
import React, { Component } from 'react';
import { withNamespaces, i18n } from 'react-i18next';
import FlashMessage from "react-native-flash-message";
import { View } from 'react-native';
import { AppContainer } from './src/components/navigation/navigation';

type Props = {
    t: i18n.t,
    logOut: () => void,
};
class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
            <AppContainer
                screenProps={{
                    logOut: this.props.logOut,
                }}
            />
            <FlashMessage position="top" />
            </View>
            //new react navigation tab navigator
        );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);
