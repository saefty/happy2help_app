// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import type { EventObject } from '../../models/event.model';
import { Event } from '../event/eventlist/event';

type Props = {
    events: Array<EventObject>,
    onEventTouch: (event: EventObject) => void,
    onEventEdit: (event: EventObject) => void,
    onEventCheckIn: (event: EventObject) => void,
    onEventApplications: (event: EventObject) => void,
};

const MAX_DESCRIPTION_LENGTH = 50;
/**
 * List of events that are created by that user
 */
export class UserEventList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this.props.events.map(event => (
                    <Event
                        controls={{
                            viewApplications: this.props.onEventApplications,
                            edit: this.props.onEventEdit,
                            checkIn: this.props.onEventCheckIn,
                        }}
                        key={event.id}
                        event={event}
                        showCreatorName={false}
                        descriptionMaxLength={MAX_DESCRIPTION_LENGTH}
                        onEventTouch={this.props.onEventTouch}
                    />
                ))}
            </View>
        );
    }
}
