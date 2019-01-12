/* @flow */
import type { OrganisationObject } from '../../models/organisation.model';

import React, { Component } from 'react';
import { View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';

import { AddMemberView } from '../../components/organisation/editOrganisation/viewAddMember/viewAddMember';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
};

class _AddMemberScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    />
                    <Appbar.Content title={this.props.organisation.name} subtitle={this.props.t('memberSubtitle')} />
                </Appbar.Header>
                <View style={{ height: '100%' }}>
                    <ScrollView>
                        <AddMemberView members={this.props.organisation.members} adminId={this.props.organisation.admin.id} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export const AddMemberScreen = withMappedNavigationProps()(withNamespaces(['Organisation'])(_AddMemberScreen));
