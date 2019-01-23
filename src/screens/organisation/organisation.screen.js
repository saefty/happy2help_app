// @flow
import React, { Component } from 'react';
import { OrganisationView } from '../../components/organisation/viewOrganisation';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { View, ActivityIndicator, Platform } from 'react-native';
import { secondaryColor } from '../../../themes/colors';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { i18n, withNamespaces } from 'react-i18next';
import type { OrganisationObject } from '../../models/organisation.model';
import { BASE_ORGANISATION } from '../../fragments';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
};

const GET_ORGA = gql`
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
    }${BASE_ORGANISATION}
`;

class OrganisationScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_ORGA} variables={{ id: this.props.organisation.id }}>
                {({ loading, error, data }) => {
                    if (!data || (!data.organisation && (loading || error)))
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={Platform.select({ ios: 0, android: 45 })} color={secondaryColor} />
                            </View>
                        );
                    return (
                        <View>
                            <Appbar.Header>
                                <Appbar.BackAction
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                />
                                <Appbar.Content title={data.organisation.name} subtitle={this.props.t('organization')} />
                            </Appbar.Header>
                            <ScrollView>
                                <OrganisationView organisation={data.organisation} />
                            </ScrollView>
                        </View>
                    );
                }}
            </Query>
        );
    }
}

export const OrganisationDetailScreenMapped = withMappedNavigationProps()(withNamespaces(['Organisation'])(OrganisationScreen));
