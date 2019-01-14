/* @flow */
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Modal, Portal, TextInput, Button, FAB } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import { graphql, compose } from 'react-apollo';
import { showMessage } from 'react-native-flash-message';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

import { styles } from './viewAddMember.style';
import type { UserObject } from '../../../../models/user.model';
import { UserListItem } from '../userListItem/userListItem';
import { memberMutations } from './member.mutations';

const ORGANISATION_MEMBER_QUERY = gql`
    query organisation($id: ID!) {
        organisation(id: $id) {
            id
            members {
                id
                username
                image {
                    id
                    url
                }
            }
            admin {
                id
                username
            }
        }
    }
`;

type Props = {
    t: i18n.t,
    orgaId: ID,
    addMemberMutation: graphql.mutate,
    removeMemberMutation: graphql.mutate,
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

    addMember = async (refetch) => {
        try {
            await this.props.addMemberMutation({
                variables: {
                    organisationId: this.props.orgaId,
                    username: this.state.toBeAdded,
                },
            });

            showMessage({
                message: this.state.toBeAdded + this.props.t('addMemberSuccess'),
                type: 'success',
                icon: 'auto',
            });

            this.hideAddModal();
            refetch();
        } catch (error) {
            showMessage({
                message: this.state.toBeAdded + this.props.t('addMemberFailure'),
                type: 'danger',
                icon: 'auto',
            });

            this.hideAddModal();
        }
    };

    removeMember = async (refetch) => {
        await this.props.removeMemberMutation({
            variables: {
                organisationId: this.props.orgaId,
                userIds: [this.state.toBeDeleted.id],
            },
        });

        showMessage({
            message: this.state.toBeDeleted.username + this.props.t('removeMemberSuccess'),
            type: 'success',
            icon: 'auto',
        });

        this.hideDeleteModal();
        refetch();
    };

    render() {
        return (
            <Query query={ORGANISATION_MEMBER_QUERY} variables={{ id: this.props.orgaId }}>
                {({ error, data, loading, refetch }) => {
                    if (error || loading) return <View />;
                    return (
                        <View style={{ flex: 1 }}>
                            <ScrollView style={{ flex: 1 }}>
                                <Portal>
                                    <Modal visible={this.state.addModalVisible} onDismiss={this.hideAddModal}>
                                        <View style={styles.modal}>
                                            <View style={styles.modalView}>
                                                <TextInput
                                                    label={this.props.t('User:userName')}
                                                    onChangeText={text => this.setState({ toBeAdded: text })}
                                                    style={{ width: '80%', margin: 20 }}
                                                />
                                                <Button
                                                    mode={'outlined'}
                                                    style={{ width: '50%', margin: 20, marginTop: 0 }}
                                                    onPress={() => this.addMember(refetch)}
                                                >
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
                                                <Button
                                                    mode={'outlined'}
                                                    color={'red'}
                                                    style={{ width: '50%', margin: 20, marginTop: 0 }}
                                                    onPress={() => this.removeMember(refetch)}
                                                >
                                                    {this.props.t('User:remove')}
                                                </Button>
                                            </View>
                                        </View>
                                    </Modal>
                                </Portal>

                                <Text style={styles.title}>
                                    {data.organisation.members.length}{' '}
                                    {data.organisation.members.length > 1 ? this.props.t('members') : this.props.t('member')}
                                </Text>
                                <Text style={styles.subTitle}>{this.props.t('memberDescription')}</Text>

                                <FlatList
                                    data={data.organisation.members}
                                    renderItem={({ item: member }) => {
                                        return (
                                            <UserListItem
                                                user={member}
                                                isAdmin={member.id === data.organisation.admin.id ? true : false}
                                                showModal={this.showDeleteModal}
                                                hideModal={this.hideDeleteModal}
                                                setDeletionUser={this.setDeletionUser}
                                            />
                                        );
                                    }}
                                    keyExtractor={member => member.id}
                                />
                                <View style={{ height: 80 }} />
                            </ScrollView>
                            <FAB style={styles.fab} icon="add" onPress={this.showAddModal} />
                        </View>
                    );
                }}
            </Query>
        );
    }
}

export const AddMemberView = compose(
    graphql(memberMutations.ADD_MEMBER, { name: 'addMemberMutation' }),
    graphql(memberMutations.REMOVE_MEMBERS, { name: 'removeMemberMutation' })
)(withApollo(withNamespaces(['Organisation'])(_AddMemberView)));
