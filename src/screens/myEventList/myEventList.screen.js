// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline, Appbar } from 'react-native-paper';
import { UserEventList } from '../../components/userEvents/userEventList';
import { MyEventDataProvider } from './myEventDataProvider';
import { EventFAB } from '../../components/userEvents/eventFAB';
import { Provider } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    visible: boolean,
};

class _MyEventList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    onEventEdit = (event: EventObject) => {
        this.props.navigation.navigate('Edit', {
            event: event,
        });
    };

    onEventParticipation = (event: EventObject, refetch: () => void) => {
        this.props.navigation.navigate('Participations', {
            screenProps: { event, refetch },
        });
    };

    // This component is wrapped in its own provider as the FAB Button in this screen would cause issues
    // Look at https://github.com/callstack/react-native-paper/issues/420
    render() {
        return (
            <Provider theme={H2HTheme}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('Discover')} />
                    <Appbar.Content title={this.props.t('myEvents')} />
                </Appbar.Header>
                <KeyboardAwareScrollView>
                    <MyEventDataProvider>
                        {(user, refetch) => {
                            return (
                                <View>
                                    <Headline>{}</Headline>
                                    <UserEventList
                                        events={user.eventSet}
                                        onEventTouch={this.openEventModal}
                                        onEventEdit={this.onEventEdit}
                                        onEventParticipation={event => {
                                            this.onEventParticipation(event, refetch);
                                        }}
                                    />
                                    <Portal>
                                        <EventFAB addEvent={() => this.props.navigation.navigate('Edit')} />
                                    </Portal>
                                </View>
                            );
                        }}
                    </MyEventDataProvider>
                </KeyboardAwareScrollView>
            </Provider>
        );
    }
}

export const MyEventList = withNamespaces(['Event'])(withNavigation(_MyEventList));
