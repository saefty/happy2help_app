// @flow
import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';

type Props = {
    src?: string,
    style: StyleSheet,
};

export class ProfilePicture extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Image source={require('./../../../../assets/images/profile/baseline_person_black_48.png')} style={this.props.style} />
            </View>
        );
    }
}
