
/* @flow */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNamespaces, i18n } from 'react-i18next';

import type { UserObject } from '../../../../models/user.model';
import { styles } from './userListItem.style';
import { ProfilePicture } from '../../../profile/profilePicture/profilePicture'

type Props = {
    user: UserObject,
    t: i18n.t,
};

class _UserListItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ProfilePicture src={this.props.user.image ? this.props.user.image.url : ''} style={styles.profilePicture}/>
                <Text>{this.props.user.username}</Text>
            </View>
        );
    }
}

export const UserListItem = (withNamespaces()(_UserListItem));
