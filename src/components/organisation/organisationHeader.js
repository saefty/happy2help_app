/**
 *  @flow
 *  Mounts image header and profile picture.
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import ImageHeader from './imageHeader';
import OrganisationProfilePicture from './organisationProfilePicture'
import { styles } from './viewOrganisation.style'

export default class OrganisationHeader extends Component {
    render() {
        return (
            <View style={styles.nameContainer}>
                <View style={styles.imageContainer}>
                    <ImageHeader />
                </View>
                <View style={styles.profileContainer}>
                    <OrganisationProfilePicture />
                </View>
            </View>
        );
    }
}
