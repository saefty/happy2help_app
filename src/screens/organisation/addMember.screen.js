/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';

import { AddMemberView } from '../../components/organisation/editOrganisation/viewAddMember/viewAddMember';
import { Appbar } from 'react-native-paper';

type Props = {
    t: i18n.t,
    orgaId: String,
    orgaName: String,
};

class _AddMemberScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    />
                    <Appbar.Content title={this.props.orgaName} subtitle={this.props.t('memberSubtitle')} />
                </Appbar.Header>

                <View style={{ flex: 1 }}>
                    <AddMemberView orgaId={this.props.orgaId} />
                </View>
            </View>
        );
    }
}

export const AddMemberScreen = withMappedNavigationProps()(withNamespaces(['Organisation'])(_AddMemberScreen));
