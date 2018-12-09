/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

import { OrganisationView } from '../../components/organisation/viewOrganisation';
import type { OrganisationObject } from '../../models/organisation.model';

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
                <OrganisationView organisation={this.props.organisation} close={this.props.navigation.goBack} />
            </View>
        );
    }
}

export const OrganisationDetailScreenMapped = withMappedNavigationProps()(OrganisationScreen);
