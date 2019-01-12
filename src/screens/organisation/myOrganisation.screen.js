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

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
};

const ORGANISATION_QUERY = gql`
    query organisation($id: ID!) {
        organisation(id: $id) {
            id
            name
            description
            image {
                id
                url
            }
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
            }
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
                                        <Appbar.Action
                                            icon="group-add"
                                            onPress={() => {
                                                this.props.navigation.navigate('Member', {
                                                    organisation: data.organisation,
                                                });
                                            }}
                                        />
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
