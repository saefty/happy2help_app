/**
 *  @flow
 *  Mounts image header and profile picture.
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import { OrganisationProfilePicture } from './organisationProfilePicture';
import { EventImage } from '../event/event.image';
import { styles } from './viewOrganisation.style';

type Props = {
    headerImg: String,
    profileImg: String,
}

export default class OrganisationHeader extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.nameContainer}>
                <View style={styles.imageContainer}>
                    <EventImage src={this.props.headerImg} style={styles.eventImage} resizeMode={'cover'}/>
                </View>
                <View style={styles.profilePicContainer}>
                    <OrganisationProfilePicture style={styles.profilePicture} src={this.props.profileImg}/>
                </View>
            </View>
        );
    }
}
