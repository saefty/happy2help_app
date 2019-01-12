/* @flow */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNamespaces, i18n } from 'react-i18next';

import type { UserObject } from '../../../../models/user.model';
import { styles } from './userListItem.style';
import { ProfilePicture } from '../../../profile/profilePicture/profilePicture';

type Props = {
    user: UserObject,
    isAdmin: boolean,
    t: i18n.t,
    showModal: () => void,
    hideModal: () => void,
    setDeletionUser: (user) => void,
};

class _UserListItem extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderAdmin = () => {
        if (this.props.isAdmin) {
            return <Text style={styles.adminText}> / Administrator</Text>;
        }
    };

    handlePress = () => {
        this.props.setDeletionUser(this.props.user);
        this.props.showModal();
    };

    renderDelete = () => {
        if (!this.props.isAdmin) {
            return (
                <TouchableOpacity onPress={this.handlePress}>
                    <Icon name={'delete-forever'} size={30} color="red" style={{ marginRight: 20 }} />
                </TouchableOpacity>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ProfilePicture
                    src={this.props.user.image ? this.props.user.image.url : ''}
                    style={this.props.isAdmin ? styles.adminPicture : styles.profilePicture}
                />
                <Text>
                    {this.props.user.username} {this.renderAdmin()}
                </Text>
                <View style={{ flex: 1 }} />
                {this.renderDelete()}
            </View>
        );
    }
}

export const UserListItem = withNamespaces()(_UserListItem);
