// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { Event } from './event';
import type { EventObject } from '../../models/event.model';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  events: Array<EventObject>,  
}


export class EventList extends Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
        {this.props.events.map((event) => <Event key={event.id} event={event}></Event>)}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}