/* @flow */
import type { OrganisationObject } from '../../models/organisation.model';

import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

import { OrganisationView } from '../../components/organisation/viewOrganisation';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    organisation: OrganisationObject,
};

class OrganisationScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.BackAction
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        />
                        <Appbar.Content title={this.props.organisation.name} subtitle="Organisation" />
                        <Appbar.Action icon="edit" />
                        <Appbar.Action icon="more-vert" />
                    </Appbar.Header>
                    <OrganisationView organisation={this.props.organisation} />
                </ScrollView>
            </View>
        );
    }
}

export const OrganisationDetailScreenMapped = withMappedNavigationProps()(OrganisationScreen);
