// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Event } from './event';

import type { EventObject } from '../../models/event.model';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../userEvents/userEvents.styles';


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
                <KeyboardAwareScrollView>
                  
                    {this.props.events.map(event => (
                        <Event
                            key={event.id}
                            event={event}
                            onEventTouch={this.props.onEventTouch}
                            descriptionMaxLength={MAX_DESCRIPTION_LENGTH}
                            style={styles.card}
                            showCreatorName={true}
                        />
                    ))}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

