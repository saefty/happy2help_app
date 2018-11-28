// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Portal } from "react-native-paper";
import type { EventObject } from '../../models/event.model';
import { MyEvent } from './myEvent';
import { MyJob } from './myJob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './userEvents.styles';
import { EventFAB } from './eventFAB';

type Props = {
  events: Array<EventObject>,
  participationSet: Array<any>,  
}


export class UserEventList extends Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }

  render() {
      return (
        <View style={styles.container}>
          <View>
              <View style={styles.header}>
                <Text style={styles.title}>My Events</Text>
              </View>
            <View>
              <KeyboardAwareScrollView>
                {this.props.events.map((event) => <MyEvent key={event.id} event={event}></MyEvent>)}
              </KeyboardAwareScrollView>
            </View>
          </View>

          <View>
            <View style={styles.header}>
              <Text style={styles.title}>My Jobs</Text>
            </View>
            <View>
              <KeyboardAwareScrollView>
                {this.props.participationSet.map((participation) => <MyJob key={participation.id} job={participation.job} participationState={participation.state}></MyJob>)}
              </KeyboardAwareScrollView>
            </View>
          </View>

          
          <EventFAB />
          

        </View>
      );
  }
}