// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Title, Paragraph, Text, Subheading, Appbar } from 'react-native-paper';
import { JobList } from './job/jobList';
import { Query } from 'react-apollo';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';
import Accordion from '../accordion/accordion';

import { SlimDate } from './../utils/date/slimDate';
import { EventImage } from './event.image';
import { ProfilePicture } from '../profile/profilePicture/profilePicture';
import { OrganisationProfilePicture } from '../organisation/organisationProfilePicture';
import { styles } from './eventDetailModal.style';
import { statusColors, primaryColor, secondaryColor } from '../../../themes/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { EVENT_DETAIL_QUERY } from './event.detail.query';

type Props = {
    t: i18n.t,
    event: EventObject,
};

export class EventDetailModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderImage = event => {
        if (event.image) {
            return (
                <View style={styles.imageContainer}>
                    <EventImage src={event.image.url} style={styles.eventImage} resizeMode={'cover'} />
                </View>
            );
        } else return null;
    };

    openEventOrganisationScreen = org => {
        this.props.navigation.navigate('DetailedOrganisationView', {
            organisation: org,
        });
    };

    renderCreator = event => {
        return (
            <View style={styles.ownerContainer}>
                <View style={{ flex: 9, flexDirection: 'row' }}>
                    <ProfilePicture src={event.creator.image ? event.creator.image.url : ''} style={styles.profilePicture} />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            marginLeft: 8,
                            paddingTop: 1,
                        }}
                    >
                        <Text style={{ fontSize: 10 }}>{this.props.t('User:user')}</Text>
                        <Text style={styles.ownerText}>{event.creator.username}</Text>
                    </View>
                </View>
            </View>
        );
    };

    renderOrganization = event => {
        return (
            <TouchableOpacity onPress={() => this.openEventOrganisationScreen(event.organisation)}>
                <View style={styles.ownerContainer}>
                    <View style={{ flex: 9, flexDirection: 'row' }}>
                        <OrganisationProfilePicture
                            src={event.organisation.image ? event.organisation.image.url : ''}
                            style={styles.profilePicture}
                        />
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                marginLeft: 8,
                                paddingTop: 1,
                            }}
                        >
                            <Text style={{ fontSize: 10 }}>{this.props.t('Organisation:organization')}</Text>
                            <View style={{ flexDirection: 'row', margin: 0, padding: 0 }}>
                                <Text style={styles.ownerText}>{event.organisation.name}</Text>
                                <Icon name="check-circle" size={14} color={statusColors.success} style={{ top: 3, marginLeft: 4 }} />
                            </View>
                        </View>
                    </View>
                    <Icon name="arrow-forward" size={30} color={primaryColor} style={{ flex: 1, top: 3, marginLeft: 4 }} />
                </View>
            </TouchableOpacity>
        );
    };

    renderOwner = event => {
        if (event.organisation) {
            return this.renderOrganization(event);
        } else if (event.creator) {
            return this.renderCreator(event);
        }
    };

    _renderDistance = () => {
        return (
            this.props.event.location.distance && (
                <View style={styles.subheadingIconBar}>
                    <Icon name="location-on" size={14} style={{ top: 7, margin: 0, padding: 0 }} />
                    <Subheading style={styles.subheading}>{this.props.event.location.distance.toFixed(1)} km entfernt</Subheading>
                </View>
            )
        );
    };

    _renderAddress = event => {
        return event.location ? (
            <View style={styles.subheadingIconBar}>
                <Icon name="location-city" size={14} style={{ top: 7, margin: 0, padding: 0 }} />
                <Subheading style={styles.subheading}>{event.location.name}</Subheading>
            </View>
        ) : null;
    };

    _renderDate = event => {
        return (
            <SlimDate
                date={new Date(event.start)}
                styleContainer={styles.dateContainer}
                styleDay={styles.dateDay}
                styleText={styles.dateText}
            />
        );
    };

    render() {
        if (!this.props.event) return <Text />;
        return (
            <Query query={EVENT_DETAIL_QUERY} variables={{ id: this.props.event.id }}>
                {({ data, refetch }) => {
                    if (!data || !data.event)
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={Platform.select({ ios: 0, android: 45 })} color={secondaryColor} />
                            </View>
                        );
                    const distance = this._renderDistance();
                    const address = this._renderAddress(data.event);
                    const date = this._renderDate(data.event);
                    return (
                        <View style={{ flex: 1 }}>
                            <NavigationEvents onWillFocus={refetch} />
                            <Appbar.Header>
                                <Appbar.Action icon="close" onPress={() => this.props.navigation.goBack()} />
                                <Appbar.Content title={data.event.name} subtitle="Event" />
                                <Appbar.Action icon="edit" onPress={() => this.props.navigation.navigate('Edit', { event: data.event })} />
                            </Appbar.Header>
                            <ScrollView>
                                {this.renderImage(data.event)}
                                {this.renderOwner(data.event)}
                                <View>
                                    <View style={{ flexDirection: 'row', width: '100%', margin: 0, padding: 0 }}>
                                        {date}
                                        <View
                                            style={{
                                                borderLeftWidth: 2,
                                                borderLeftColor: primaryColor,
                                                marginTop: 20,
                                                marginBottom: 5,
                                                marginRight: 10,
                                            }}
                                        />
                                        <View style={{ flexDirection: 'column', padding: 0, margin: 0 }}>
                                            <Title style={styles.title}>{data.event.name}</Title>
                                            {distance}
                                            {address}
                                        </View>
                                    </View>

                                    <View style={{ margin: 15, marginBottom: 8 }}>
                                        <Text style={styles.dates}>
                                            {moment(data.event.start).format('DD. MMM. HH:MM')}
                                            {' - '}
                                            {moment(data.event.end).format('DD. MMM. HH:MM')}
                                        </Text>
                                        <Paragraph>{data.event.description}</Paragraph>
                                    </View>

                                    <Accordion title="Jobs" icon="work" expansion={true} padding={1}>
                                        <JobList jobs={data.event.jobSet} startDate={data.event.start} refetch={refetch} />
                                    </Accordion>
                                </View>
                            </ScrollView>
                        </View>
                    );
                }}
            </Query>
        );
    }
}

export const EventDetailModalNavigationMapped = withNamespaces('Navigation')(withMappedNavigationProps()(EventDetailModal));
