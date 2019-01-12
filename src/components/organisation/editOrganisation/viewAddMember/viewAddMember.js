/* @flow */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { withNamespaces } from 'react-i18next';

import { styles } from './viewAddMember.style';
import { UserListItem } from '../userListItem/userListItem';

type Props = {
    t: i18n.t,
    members: Array,
    adminId: ID,
};

class _AddMemberView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleAndButton}>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.title}>
                        {this.props.members.length} {this.props.members.length > 1 ? this.props.t('members') : this.props.t('member')}
                    </Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 12}}>
                        <TouchableOpacity style={styles.circularButton} onPress={this.showModal}>
                            <Icon name={'add'} size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.subTitle}>{this.props.t('memberDescription')}</Text>
                <FlatList
                    data={this.props.members}
                    renderItem={({ item }) => {
                        return <UserListItem user={item} isAdmin={item.id === this.props.adminId ? true : false} />;
                    }}
                />
            </View>
        );
    }
}

export const AddMemberView = withNamespaces(['Organisation'])(_AddMemberView);
