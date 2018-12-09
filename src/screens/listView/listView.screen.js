// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View } from 'react-native';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { EventList } from './../../components/listview/eventList';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';



type State = {
    event?: EventObject,
    visible: boolean,
}

class _ListView extends Component<any, State> {
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
                  <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                        <Appbar.Content title="" />
                        <Appbar.Action icon="search" />
                    </Appbar.Header>
                <EventDetailModal visible={this.state.visible} onDismiss={this.hideModal} event={this.state.event}></EventDetailModal>
                <EventDataProvider>
                    {events => <EventList onEventTouch={this.openEventModal} events={events} {...this.props}/>}
                </EventDataProvider>
            </View>
        );
    }
}

export const ListView = withNavigation(_ListView);