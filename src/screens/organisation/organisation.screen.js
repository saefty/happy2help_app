/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

import { OrganisationView } from '../../components/organisation/viewOrganisation'
import organisationMock from '../../../assets/mockdata/mockorganisations'

class OrganisationScreen extends Component<any> {
    render() {
        return (
            <View>
                <OrganisationView organisation={organisationMock} close={this.props.navigation.goBack} />
            </View>
        )
    }
}

export const OrganisationDetailScreenMapped = withMappedNavigationProps()(OrganisationScreen);
