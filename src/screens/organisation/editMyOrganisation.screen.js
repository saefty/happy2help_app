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
/**
 * Use for edit organisation in organisation mode
 */
class _EditMyOrganisationScreen extends Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {
            orgaId: undefined,
        };
    }

    render() {
        const orga = this.props.organisation;

        return (
            <KeyboardAwareScrollView>
                <EditOrganisationView close={this.props.navigation.goBack} organisation={orga} />
            </KeyboardAwareScrollView>
        );
    }
}

export const EditMyOrganisationScreen = withMappedNavigationProps()(_EditMyOrganisationScreen);
