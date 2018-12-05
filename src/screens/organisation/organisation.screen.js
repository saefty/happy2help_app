/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';

import { OrganisationView } from '../../components/organisation/viewOrganisation'
import organisationMock from '../../../assets/mockdata/mockorganisations'

export class OrganisationScreen extends Component<any> {
    render() {
        return (
            <View>
                <OrganisationView organisation={organisationMock} />
            </View>
        )
    }
}
