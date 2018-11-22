// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProfilePicture } from './../../profilePicture/profilePicture';
import { styles } from './headerStyle';
import type { LocationObject } from './../../../../models/location.model'


type Props = {
    t: i18n.t,
    userName: string,
    location: LocationObject,
};

export class Header extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.colouredBlock} />
                <View style={styles.headerTextContainer}>
                    <ProfilePicture style={styles.profilePicture}/>
                    <View style={styles.nameAndLocationContainer}>
                        <Text style={styles.userName}>{this.props.userName} </Text>
                        <Text style={styles.location}>{this.props.location ? this.props.location.name : ''} </Text>
                    </View>
                </View>
            </View>
        );
    }
}
