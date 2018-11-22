// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { DefaultStyles } from '../../../config/style';
//import { i18n } from 'react-i18next';

import { Map } from '../../components/map/map';
import { Portal } from 'react-native-paper';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { EventDataProvider } from '../../providers/eventDataProvider';

type Props = {
    events: Array<EventObject>
}
type State = {
    event?: EventObject,
    visible: boolean,
    userRegion: Region
}

export class MapScreen extends Component<Props, State> {
    state = {
        event: undefined,
        visible: false,
        userRegion: Region
    }
    openEventModal = (event: EventObject) => {
        this.setState({event: event, visible: true });
        this.forceUpdate();
    }

    hideModal = () => {
        this.setState({ visible: false })
    }

    setUserViewPoint = (region: Region) => {
        this.setState({ userRegion: region })
    }

    render() {
        return (
            <View>

                <Portal>
                    <EventDetailModal visible={this.state.visible} onDismiss={this.hideModal} event={this.state.event}></EventDetailModal>
                </Portal>
                <EventDataProvider pollInterval={30000}>
                    {(events) => {
                        return  <Map events={events} onEventTouch={this.openEventModal} initialRegion={this.state.userRegion} setUserViewPoint={this.setUserViewPoint}/>
                    }}
                </EventDataProvider>

            </View>

        )
    }
}