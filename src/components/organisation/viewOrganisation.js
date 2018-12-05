/* @flow */

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Text, Divider } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import OrganisationHeader from './organisationHeader';
import Panel from './panel/panel';
import { ListView } from '../../screens/listView/listView.screen';
import { styles } from './viewOrganisation.style';

type Props = {
    t: i18n.t,
    organisation: Object
};

class _OrganisationView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={{ height: 100 + '%' }}>
                <Appbar.Header>
                    <Appbar.BackAction />
                    <Appbar.Content title={this.props.organisation.name} subtitle="Organisation" />
                    <Appbar.Action icon="edit" />
                    <Appbar.Action icon="more-vert" />
                </Appbar.Header>

                <ScrollView style={{ width: 100 + '%' }}>

                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <OrganisationHeader />
                        </View>

                        <View style={styles.titleBar}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameText}>{this.props.organisation.name}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <FontAwesome5 name={'users'} size={25} />
                            </View>
                            <View style={styles.memberContainer}>
                                <Text style={styles.nameText}>{this.props.organisation.members.length}</Text>
                            </View>
                        </View>

                        <View style={styles.dividerContainer}>
                            <Divider style={styles.divider} />
                        </View>

                        <View style={styles.panelContainer}>
                            <Panel title={this.props.t('description')} initialExpansion={true}>
                                <Text>{this.props.organisation.description}</Text>
                            </Panel>
                            <Panel title={this.props.t('currentEvents')} initialExpansion={false}>
                                <ListView />
                            </Panel>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export const OrganisationView = withNamespaces(['Organisation'])(_OrganisationView);
