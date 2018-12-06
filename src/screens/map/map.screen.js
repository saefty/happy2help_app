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
import { Portal, Appbar } from 'react-native-paper';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { withNavigation } from 'react-navigation';


type Props = {
    events: Array<EventObject>
}
type State = {
    event?: EventObject,
    visible: boolean,
    userRegion: Region
}

export class _MapScreen extends Component<Props, State> {
    state = {
        event: undefined,
        visible: false,
        userRegion: Region
    }
    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event
        })
        //this.setState({event: event, visible: true });
        //this.forceUpdate();
    }

    hideModal = () => {
        this.setState({ visible: false })
    }

    setUserViewPoint = (region: Region) => {
        //this.setState({ userRegion: region })
    }

    render() {
        return (
            <View>
                 <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content title="" />
                    <Appbar.Action icon="search" />
                </Appbar.Header>
                <EventDataProvider pollInterval={undefined}>
                    {(events) => {
                        return  <Map events={events} onEventTouch={this.openEventModal} initialRegion={this.state.userRegion} setUserViewPoint={this.setUserViewPoint}/>
                    }}
                </EventDataProvider>
            </View>
        )
    }
}

export const MapScreen = withNavigation(_MapScreen);