/* @flow */
import type { OrganisationObject } from '../../models/organisation.model';

import React, { Component } from 'react';
import { View, ScrollView, ListView } from 'react-native';
import { Appbar, Text, Divider, List, Button, TouchableRipple, IconButton } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import OrganisationHeader from './organisationHeader';
import Accordion from '../accordion/accordion';
import { styles } from './viewOrganisation.style';
import { H2HTheme } from '../../../themes/default.theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { primaryColor, neutralColors } from '../../../themes/colors';

type Props = {
    t: i18n.t,
    organisation: OrganisationObject,
    openOrga?: () => void,
    showEvents?: boolean,
    showImage?: boolean,
};

type State = {
    events: Array,
};

class _OrganisationView extends Component<Props, State> {
    static defaultProps = {
        showEvents: true,
        showImage: true,
    };
    constructor(props: Props) {
        super(props);

        // event list
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            events: ds.cloneWithRows(this.props.organisation.eventSet),
        };
    }

    render() {
        const header = this.props.showImage ? (
            <View style={styles.headerContainer}>
                <OrganisationHeader />
            </View>
        ) : null;
        const currentEvents = this.props.showEvents ? (
            <View style={{ backgroundColor: neutralColors.surface, marginBottom: 15 }}>
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
        ) : null;

        const orgaText = this.props.openOrga ? (
            <TouchableRipple onPress={this.props.openOrga}>
                <Text style={[styles.nameText, { color: H2HTheme.colors.primary }]}>
                    {this.props.organisation.name} <Icon name="info-outline" size={20} />
                </Text>
            </TouchableRipple>
        ) : (
            <Text style={styles.nameText}>{this.props.organisation.name}</Text>
        );
        return (
            <View>
                <View style={styles.container}>
                    {header}
                    <View style={styles.titleBar}>
                        <View style={styles.nameContainer}>{orgaText}</View>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name={'users'} size={25} />
                        </View>
                        <View style={styles.memberContainer}>
                            <Text style={styles.nameText}>{this.props.organisation.members.length}</Text>
                        </View>
                    </View>

                    <View style={styles.accordionContainer}>
                        <View style={{ backgroundColor: neutralColors.surface, marginBottom: 15 }}>
                            <Accordion title={this.props.t('about')} expansion={true} icon={'description'}>
                                <Text style={{ paddingBottom: 15 }}>{this.props.organisation.description}</Text>
                            </Accordion>
                        </View>
                        {currentEvents}
                    </View>
                </View>
            </View>
        );
    }
}

export const OrganisationView = withNamespaces(['Organisation'])(_OrganisationView);
