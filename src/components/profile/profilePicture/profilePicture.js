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
        const DEFAULT = require('./../../../../assets/images/profile/baseline_person_black_48.png');

        return (
            <View>
                <Image source={this.props.src !== '' ? {uri: this.props.src} : DEFAULT} style={this.props.style} />
            </View>
        );
    }
}
