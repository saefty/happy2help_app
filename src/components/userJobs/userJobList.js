// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { MyJob } from './myJob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
    participationSet: Array<any>,
    openEventDetails: any => void,
};
export class UserJobList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <View>
                {this.props.participationSet.map(participation => (
                    <MyJob
                        openEventDetails={this.props.openEventDetails}
                        key={participation.id}
                        job={participation.job}
                        participationState={participation.state}
                    />
                ))}
            </View>
        );
    }
}
