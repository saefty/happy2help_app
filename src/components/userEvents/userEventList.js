// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import type { EventObject } from '../../models/event.model';
import type { Job } from '../../models/job.model';
import { MyEvent } from './myEvent';
import { MyJob } from './myJob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  events: Array<EventObject>,
  jobs: Array<any>,  
}


export class UserEventList extends Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
//           {this.props.jobs.map((job) => <MyJob key={job.id} job={job}></MyJob>)}

  render() {
      return (
        <View>
          <View><Text>My Events</Text></View>
          <KeyboardAwareScrollView>
          {this.props.events.map((event) => <MyEvent key={event.id} event={event}></MyEvent>)}
          </KeyboardAwareScrollView>
          
          <View><Text>My Jobs</Text></View>
          <KeyboardAwareScrollView>
          {this.props.jobs.map((job) => <MyJob key={job.job.id} job={job.job}></MyJob>)}
          </KeyboardAwareScrollView>
        </View>
      );
  }
}