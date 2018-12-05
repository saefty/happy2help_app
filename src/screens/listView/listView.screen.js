// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View } from 'react-native';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { EventList } from './../../components/listview/eventList';
import { Portal } from 'react-native-paper';
import { EventDetailModal } from '../../components/event/eventDetailModal';

type State = {
    event?: EventObject,
    visible: boolean,
}

export class ListView extends Component<any, State> {
    state = {
        event: undefined,
        visible: false,
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event
        })
    }

    hideModal = () => {
        this.setState({ visible: false })
    }

    render() {
        return (
            <View>
                <EventDetailModal visible={this.state.visible} onDismiss={this.hideModal} event={this.state.event}></EventDetailModal>
                <EventDataProvider>
                    {events => <EventList onEventTouch={this.openEventModal} events={events} {...this.props}/>}
                </EventDataProvider>
            </View>
        );
    }
}
