// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import type { EventObject } from '../../models/event.model';
import { Event } from '../event/eventlist/event';

type Props = {
    events: Array<EventObject>,
    onEventTouch: (event: EventObject) => void,
    onEventEdit: (event: EventObject) => void,
    onEventParticipation: (event: EventObject) => void,
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
                            view: this.props.onEventTouch,
                            edit: this.props.onEventEdit,
                            participations: this.props.onEventParticipation,
                        }}
                        key={event.id}
                        event={event}
                        showCreatorName={false}
                        descriptionMaxLength={MAX_DESCRIPTION_LENGTH}
                    />
                ))}
            </View>
        );
    }
}
