// @flow
import React, { Component } from "react";
import { View } from "react-native";
import { MyJob } from './myJob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './userEvents.styles';

type Props = { 
    participationSet: Array<any>,  
}
export class UserJobList extends Component<Props> {
  
    constructor(props: Props) {
      super(props);
    }
    render() {  
        return(
            <View style={styles.scroll}>
                <KeyboardAwareScrollView>
                {
                this.props.participationSet.map(
                    (participation) => <MyJob 
                    key={participation.id} 
                    job={participation.job}
                    style={styles.card} 
                    participationState={participation.state}
                    />)
                }
                </KeyboardAwareScrollView>
            </View>
            
        );
    }
}