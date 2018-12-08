/* @flow */

import React, { Component } from 'react';
import { View, ScrollView, ListView } from 'react-native';
import { Appbar, Text, Divider, List } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import OrganisationHeader from './organisationHeader';
import Accordion from './accordion/accordion';
import { styles } from './viewOrganisation.style';
import type { OrganisationObject } from '../../models/organisation.model';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
    close: () => void,
};

type State = {
    events: Array,
};

class _OrganisationView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // event list
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            events: ds.cloneWithRows(this.props.organisation.eventSet),
        };
    }

    render() {
        return (
            <View style={{ height: 100 + '%' }}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => {
                            this.props.close();
                        }}
                    />
                    <Appbar.Content title={this.props.organisation.name} subtitle="Organization" />
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

                        <View style={styles.accordionContainer}>

                            <View style={{ backgroundColor: '#F4F9FE', marginBottom: 15}}>
                                <Accordion title={this.props.t('description')} expansion={true} icon={'description'}>
                                    <Text style={{paddingBottom: 15}}>{this.props.organisation.description}</Text>
                                </Accordion>
                            </View>

                            <View style={{ backgroundColor: '#F4F9FE', marginBottom: 15}}>
                                <Accordion title={this.props.t('currentEvents')} expansion={false} icon={'event'}>
                                    <ListView
                                        dataSource={this.state.events}
                                        renderRow={rowData => (
                                            <List.Item
                                                title={`${rowData.name}`}
                                                description={`${rowData.description}`}
                                                left={props => <List.Icon {...props} icon="chevron-right" />}
                                            />
                                        )}
                                    />
                                </Accordion>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export const OrganisationView = withNamespaces(['Organisation'])(_OrganisationView);
