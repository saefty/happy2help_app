/* @flow */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';

import { styles } from './viewAddMember.style';
import type { UserObject } from '../../../../models/user.model';
import { UserListItem } from '../userListItem/userListItem';

type Props = {
    t: i18n.t,
    members: Array,
    adminId: ID,
};

type State = {
    addModalVisible: boolean,
    deleteModalVisible: boolean,
    toBeAdded: string,
    toBeDeleted: UserObject,
};

class _AddMemberView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            toBeDeleted: null,
            toBeAdded: '',
            addModalVisible: false,
            deleteModalVisible: false,
        };
    }

    showAddModal = () => {
        this.setState({ addModalVisible: true, toBeAdded: '' });
    };
    hideAddModal = () => this.setState({ addModalVisible: false });

    setDeletionUser = user => this.setState({ toBeDeleted: user });
    showDeleteModal = () => this.setState({ deleteModalVisible: true });
    hideDeleteModal = () => this.setState({ deleteModalVisible: false });

    render() {
        return (
            <View style={styles.container}>
                <Portal>
                    <Modal visible={this.state.addModalVisible} onDismiss={this.hideAddModal}>
                        <View style={styles.modal}>
                            <View style={styles.modalView}>
                                <TextInput
                                    label={this.props.t('User:userName')}
                                    onChangeText={text => this.setState({ toBeAdded: text })}
                                    style={{ width: '80%', margin: 20 }}
                                />
                                <Button mode={'outlined'} style={{ width: '50%', margin: 20, marginTop: 0 }}>
                                    {this.props.t('User:add')}
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Portal>

                <Portal>
                    <Modal visible={this.state.deleteModalVisible} onDismiss={this.hideDeleteModal}>
                        <View style={styles.modal}>
                            <View style={styles.modalView}>
                                <View style={{ width: '80%', margin: 20 }}>
                                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 20 }}>
                                        {this.state.toBeDeleted ? this.state.toBeDeleted.username : ''}
                                    </Text>
                                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 8 }}>
                                        {this.props.t('User:removePrompt')}
                                    </Text>
                                </View>
                                <Button mode={'outlined'} color={'red'} style={{ width: '50%', margin: 20, marginTop: 0 }}>
                                    {this.props.t('User:remove')}
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </Portal>

                <View style={styles.titleAndButton}>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.title}>
                        {this.props.members.length} {this.props.members.length > 1 ? this.props.t('members') : this.props.t('member')}
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                        <TouchableOpacity style={styles.circularButton} onPress={this.showAddModal}>
                            <Icon name={'add'} size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.subTitle}>{this.props.t('memberDescription')}</Text>

                <FlatList
                    data={this.props.members}
                    renderItem={({item: member}) => {
                        return (
                            <UserListItem
                                user={member}
                                isAdmin={member.id === this.props.adminId ? true : false}
                                showModal={this.showDeleteModal}
                                hideModal={this.hideDeleteModal}
                                setDeletionUser={this.setDeletionUser}
                            />
                        );
                    }}
                    keyExtractor={member => member.id}
                />
            </View>
        );
    }
}

export const AddMemberView = withNamespaces(['Organisation'])(_AddMemberView);
