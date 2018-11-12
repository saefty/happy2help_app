// @flow
import React, { Component } from 'react';
import { Sentry } from 'react-native-sentry';
import { SentryConfig } from './config/sentry';
<<<<<<< HEAD
import { DefaultStyles } from './config/style';
import { withNamespaces } from 'react-i18next';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import EventList from 'src/components/listview/eventList'
=======
import { withNamespaces, i18n } from 'react-i18next';
import { I18nNavigation } from './src/components/navigation/bottomNavigation'

>>>>>>> 075bf92fd2f7bf33af1a94c563705c71279fc44c

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
        /*     
        return (
<<<<<<< HEAD
             <View style={DefaultStyles.container}>
                <MapView
                    accessible={true}
                    style={styles.map}
                />
                <Button onPress={this.props.logOut} style={styles.logOut} mode="contained">
                    Log out
                </Button>
                
            </View>
=======
            <I18nNavigation logOut={this.props.logOut} />
>>>>>>> 075bf92fd2f7bf33af1a94c563705c71279fc44c
        );
        */
       return (             
           <View style={DefaultStyles.container}>
                <EventList></EventList>
           </View>
       );
    }
}
export default withNamespaces('common', {
    bindI18n: 'languageChanged',
    bindStore: false,
})(App);