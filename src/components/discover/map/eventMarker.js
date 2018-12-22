// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { primaryColor, statusColors } from '../../../../themes/colors';

type Props = {
    event: EventObject,
    onEventTouch: (event: EventObject) => void,
};

export class EventMarker extends Component<Props> {
    marker: {
        current: Marker,
    };

    constructor(props: Props) {
        super(props);
        this.marker = React.createRef();
    }

    pinColor() {
        if (this.props.event.organisation) {
            return primaryColor;
        } else {
            return statusColors.warning;
        }
    }

    render() {
        return (
            <Marker
                ref={this.marker}
                identifier={`event${this.props.event.id}`}
                key={`event${this.props.event.id}`}
                coordinate={{
                    latitude: this.props.event.location.latitude,
                    longitude: this.props.event.location.longitude,
                    longitudeDelta: 0.1,
                    latitudeDelta: 0.1,
                }}
                pinColor={this.pinColor()}
                title={this.props.event.name}
                description={this.props.event.description}
                tracksViewChanges={false}
                onPress={e => {
                    e.stopPropagation();
                    this.props.onEventTouch(this.props.event);
                }}
            />
        );
    }
}
