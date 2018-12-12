/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { EditOrganisationView } from '../../components/organisation/editOrganisation/editOrganisation.view';
import type { OrganisationObject } from '../../models/organisation.model';

type Props = {
    organisation?: OrganisationObject,
};

class _EditOrganisationScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    
    render() {
        return (
            <KeyboardAwareScrollView>
                <EditOrganisationView close={this.props.navigation.goBack} />
            </KeyboardAwareScrollView>
        );
    }
}

export const EditOrganisationScreen = withMappedNavigationProps()(_EditOrganisationScreen);
