// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Event } from './event';

import type { EventObject } from '../../../models/event.model';

type Props = {
    events: Array<EventObject>,
    onEventTouch: (event: EventObject) => void,
};

const MAX_DESCRIPTION_LENGTH = 100;

export class EventList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this.props.events.map(event => (
                    <Event
                        key={event.id}
                        event={event}
                        onEventTouch={this.props.onEventTouch}
                        descriptionMaxLength={MAX_DESCRIPTION_LENGTH}
                        showCreatorName={true}
                    />
                ))}
            </View>
        );
    }
}
