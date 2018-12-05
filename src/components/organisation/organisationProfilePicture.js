/* @flow */

import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { styles } from './viewOrganisation.style';

export default class OrganisationProfilePicture extends Component<any,any> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.profilePicture} source={require('./../../../assets/images/profile/profile_mult.png')} />
            </View>
        );
    }
}
