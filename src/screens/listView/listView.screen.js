// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { EventList } from './../../components/listview/eventList';

type Props = {
};

export class ListView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <EventDataProvider>
                {events => <EventList events={events}/>}
                </EventDataProvider>
            </View>
        );
    }
}
