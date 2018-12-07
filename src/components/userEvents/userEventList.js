// @flow
import React, { Component } from "react";
import { View } from "react-native";
import type { EventObject } from '../../models/event.model';
import { Event } from '../listview/event';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './userEvents.styles';


type Props = {
  events: Array<EventObject>,
  onEventTouch: (event: EventObject) => void,
}

const MAX_DESCRIPTION_LENGTH = 50;

export class UserEventList extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
      return (
        <View style={styles.scroll}>
          <KeyboardAwareScrollView>
            {
              this.props.events.map((event) => 
              <Event 
              key={event.id} 
              event={event}
              style={styles.card}
              showCreatorName={false}
              onEventTouch={this.props.onEventTouch}
              descriptionMaxLength={MAX_DESCRIPTION_LENGTH}
              />)
            }
          </KeyboardAwareScrollView>
        </View>
      );
  }
}