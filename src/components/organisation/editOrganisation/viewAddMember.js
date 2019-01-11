/* @flow */
import type { OrganisationObject } from '../../models/organisation.model';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNamespaces } from 'react-i18next';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
};

class _AddMemberView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Add Member Screen</Text>
            </View>
        );
    }
}

export const AddMemberView = withNamespaces(['Organisation'])(_AddMemberView);
