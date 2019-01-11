/* @flow */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withNamespaces } from 'react-i18next';
import { UserListItem } from './userListItem/userListItem';

type Props = {
    t: i18n.t,
    members: Array,
};

class _AddMemberView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
        <FlatList data={this.props.members} renderItem={({item}) => <UserListItem user={item}/>}/>
            </View>
        );
    }
}

export const AddMemberView = withNamespaces(['Organisation'])(_AddMemberView);
