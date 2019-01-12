
/* @flow */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import { withNamespaces, i18n } from 'react-i18next';

import type { UserObject } from '../../../../models/user.model';
import { styles } from './userListItem.style';
import { ProfilePicture } from '../../../profile/profilePicture/profilePicture'

type Props = {
    user: UserObject,
    isAdmin: boolean,
    t: i18n.t,
};

class _UserListItem extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderAdmin = () => {
        if(this.props.isAdmin) {
            return(<Text style={styles.adminText}> / Administrator</Text>)
        }
    }

    renderDelete = () => {
        if (!this.props.isAdmin) {
            return <Icon name={'delete-forever'} size={30} color='red' style={{marginRight: 20}}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ProfilePicture 
                    src={this.props.user.image ? this.props.user.image.url : ''} 
                    style={this.props.isAdmin ? styles.adminPicture : styles.profilePicture}
                />
                <Text>{this.props.user.username} {this.renderAdmin()}</Text>
                <View style={{flex: 1}}></View>
                {this.renderDelete()}
            </View>
        );
    }
}

export const UserListItem = (withNamespaces()(_UserListItem));
