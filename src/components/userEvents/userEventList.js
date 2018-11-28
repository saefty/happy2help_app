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
  participationSet: Array<any>,  
}


export class UserEventList extends Component<Props> {
  
  constructor(props: Props) {
    super(props);
  }
//           {this.props.jobs.map((job) => <MyJob key={job.id} job={job}></MyJob>)}

  render() {
      return (
        <View style={{alignContent: "center"}}>
        <View>
          <View style={{backgroundColor: "#008FB8", justifyContent: "center"}}>
            <Text style={{color: "#fff", fontSize: 25, marginLeft: 5}}>My Events</Text>
          </View>
          <View style={{backgroundColor: "#eee", alignItems: "center"}}>
          <KeyboardAwareScrollView>
            {this.props.events.map((event) => <MyEvent key={event.id} event={event}></MyEvent>)}
          </KeyboardAwareScrollView>
        </View>
        </View>
        <View>
          <View style={{backgroundColor: "#008FB8", justifyContent: "center"}}>
            <Text style={{color: "#fff", fontSize: 25, marginLeft: 5}}>My Jobs</Text>
          </View>
          <KeyboardAwareScrollView>
            {this.props.participationSet.map((participation) => <MyJob key={participation.id} job={participation.job} participationState={participation.state}></MyJob>)}
          </KeyboardAwareScrollView>
        </View>
        </View>
      );
  }
}