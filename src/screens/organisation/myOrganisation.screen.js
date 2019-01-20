/* @flow */
import type { OrganisationObject } from '../../models/organisation.model';

import React, { Component } from 'react';
import { View } from 'react-native';

import { OrganisationView } from '../../components/organisation/viewOrganisation';
import { Appbar, IconButton } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';
import { NavigationEvents } from 'react-navigation';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { BASE_ORGANISATION } from '../../fragments';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
};

const USER_QUERY = gql`
    {
        user {
            id
        }
    }
`;

const ORGANISATION_QUERY = gql`
    query organisation($id: ID!) {
        organisation(id: $id) {
            ...BASE_ORGANISATION
            eventSet {
                id
                name
                description
                image {
                    id
                    url
                }
            }
        }
    }
    ${BASE_ORGANISATION}
`;
/**
 * Used for organisation mode
 */
class _MyOrganisationScreen extends Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {
            orgaId: undefined,
        };
    }

    componentDidMount() {
        this.refresh();
    }

    getORGA = async () => {
        const result = await this.props.client.query({
            query: gql`
                query {
                    ORGANISATION_ID @client
                }
            `,
            fetchPolicy: 'cache-only',
        });
        return result.data.ORGANISATION_ID;
    };

    refresh = async () => {
        const id = await this.getORGA();
        this.setState({ orgaId: id });
    };

    renderAddButton = (adminId, orgaId, orgaName) => {
        return (
            <Query query={USER_QUERY}>
                {({ error, data, loading }) => {
                    if (error || loading) return null;
                    else if (data.user.id === adminId)
                        return (
                            <Appbar.Action
                                icon="group-add"
                                color={'#fff'}
                                onPress={() => {
                                    this.props.navigation.navigate('Member', {
                                        orgaId: orgaId,
                                        orgaName: orgaName,
                                    });
                                }}
                            />
                        );
                    else return null;
                }}
            </Query>
        );
    };

    render() {
        const orgaId = this.state.orgaId;
        if (!orgaId) return <View />;

        return (
            <View>
                <NavigationEvents onWillFocus={() => this.refresh()} />

                <ScrollView>
                    <Query query={ORGANISATION_QUERY} variables={{ id: orgaId }}>
                        {({ error, data, loading, refetch }) => {
                            if (error || loading) return <View />;
                            return (
                                <View>
                                    <NavigationEvents onWillFocus={refetch} />

                                    <Appbar.Header>
                                        <IconButton
                                            icon={() => <IconMat name="menu" size={24} color={'#fff'} />}
                                            onPress={() => this.props.navigation.openDrawer()}
                                            style={{
                                                alignSelf: 'center',
                                                left: 4,
                                            }}
                                        />
                                        <Appbar.Content title={data.organisation.name} subtitle={this.props.t('organization')} />

                                        {this.renderAddButton(data.organisation.admin.id, orgaId, data.organisation.name)}

                                        <Appbar.Action
                                            icon="edit"
                                            onPress={() => {
                                                this.props.navigation.navigate('Edit', {
                                                    organisation: data.organisation,
                                                });
                                            }}
                                        />
                                    </Appbar.Header>
                                    <OrganisationView organisation={data.organisation} />
                                </View>
                            );
                        }}
                    </Query>
                </ScrollView>
            </View>
        );
    }
}

export const MyOrganisationScreen = withApollo(withNamespaces(['Organisation'])(_MyOrganisationScreen));
