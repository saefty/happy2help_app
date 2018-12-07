// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { DefaultStyles } from '../../../config/style';
//import { i18n } from 'react-i18next';

import { Map } from '../../components/map/map';
import { Portal } from 'react-native-paper';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { EventDataProvider } from '../../providers/eventDataProvider';

type Props = {
    events: Array<EventObject>,
};
type State = {
    event?: EventObject,
    userRegion: Region,
};

export class MapScreen extends Component<Props, State> {
    state = {
        event: undefined,
        visible: false,
        userRegion: Region,
    };
    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    render() {
        return (
            <View>
                <EventDataProvider pollInterval={undefined}>
                    {events => {
                        return <Map events={events} onEventTouch={this.openEventModal} initialRegion={this.state.userRegion} setUserViewPoint={() => {}} />;
                    }}
                </EventDataProvider>
            </View>
        );
    }
}
