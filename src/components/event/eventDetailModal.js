// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Title, Paragraph, Text, Subheading, Appbar } from 'react-native-paper';
import { JobList } from './job/jobList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';
import Accordion from '../accordion/accordion';

import { SlimDate } from './../utils/date/slimDate';
import { EventImage } from './event.image';
import { ProfilePicture } from '../profile/profilePicture/profilePicture';
import { OrganisationProfilePicture } from '../organisation/organisationProfilePicture';
import { styles } from './eventDetailModal.style';
import { statusColors, primaryColor } from '../../../themes/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

type Props = {
    t: i18n.t,
    event: EventObject,
};

const JOB_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            start
            end
            jobSet {
                id
                name
                description
                totalPositions
                currentUsersParticipation {
                    id
                    state
                    job {
                        id
                    }
                }
                requiresskillSet {
                    skill {
                        id
                        name
                    }
                }
                participationSet {
                    id
                    state
                }
            }
        }
    }
`;

export const ORGANISATION_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            start
            end
            organisation {
                id
                name
                description
                image {
                    id
                    url
                }
                members {
                    id
                    username
                }
                eventSet {
                    id
                    name
                    description
                    image {
                        id
                        url
                    }
                }
            }
        }
    }
`;

export const CREATOR_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            creator {
                id
                username
                image {
                    id
                    url
                }
            }
        }
    }
`;

export class EventDetailModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderImage = () => {
        if (this.props.event.image) {
            return (
                <View style={styles.imageContainer}>
                    <EventImage src={this.props.event.image.url} style={styles.eventImage} resizeMode={'cover'} />
                </View>
            );
        } else return null;
    };

    openEventOrganisationScreen = org => {
        this.props.navigation.navigate('DetailedOrganisationView', {
            organisation: org,
        });
    };

    renderCreator = () => {
        return (
            <Query query={CREATOR_QUERY} variables={{ id: this.props.event.id }} cache="network-only">
                {({ error, loading, data }) => {
                    if (error || loading) return <View />;
                    return (
                        <View style={styles.ownerContainer}>
                            <View style={{ flex: 9, flexDirection: 'row' }}>
                                <ProfilePicture
                                    src={data.event.creator.image ? data.event.creator.image.url : ''}
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
                                    <Text style={{ fontSize: 10 }}>{this.props.t('User:user')}</Text>
                                    <Text style={styles.ownerText}>{data.event.creator.username}</Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
            </Query>
        );
    };

    renderOrganization = () => {
        return (
            <Query query={ORGANISATION_QUERY} variables={{ id: this.props.event.id }} cache="network-only">
                {({ error, loading, data }) => {
                    if (error || loading) return <View />;
                    return (
                        <TouchableOpacity onPress={() => this.openEventOrganisationScreen(data.event.organisation)}>
                            <View style={styles.ownerContainer}>
                                <View style={{ flex: 9, flexDirection: 'row' }}>
                                    <OrganisationProfilePicture
                                        src={data.event.organisation.image ? data.event.organisation.image.url : ''}
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
                                            <Text style={styles.ownerText}>{data.event.organisation.name}</Text>
                                            <Icon
                                                name="check-circle"
                                                size={14}
                                                color={statusColors.success}
                                                style={{ top: 3, marginLeft: 4 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <Icon name="arrow-forward" size={30} color={primaryColor} style={{ flex: 1, top: 3, marginLeft: 4 }} />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            </Query>
        );
    };

    renderOwner = () => {
        if (this.props.event.organisation) {
            return this.renderOrganization();
        } else if (this.props.event.creator) {
            return this.renderCreator();
        }
    };

    render() {
        if (!this.props.event) return <Text />;
        const distance = this.props.event.location.distance && (
            <View style={styles.subheadingIconBar}>
                <Icon name="location-on" size={14} style={{ top: 7, margin: 0, padding: 0 }} />
                <Subheading style={styles.subheading}>{this.props.event.location.distance.toFixed(1)} km entfernt</Subheading>
            </View>
        );

        const address = this.props.event.location ? (
            <View style={styles.subheadingIconBar}>
                <Icon name="location-city" size={14} style={{ top: 7, margin: 0, padding: 0 }} />
                <Subheading style={styles.subheading}>{this.props.event.location.name}</Subheading>
            </View>
        ) : null;

        const date = (
            <SlimDate
                date={new Date(this.props.event.start)}
                styleContainer={styles.dateContainer}
                styleDay={styles.dateDay}
                styleText={styles.dateText}
            />
        );

        const date2 = (
            <SlimDate
                date={new Date(this.props.event.start)}
                styleContainer={styles.dateContainer}
                styleDay={styles.dateDay}
                styleText={styles.dateText}
            />
        );

        return (
            <View style={{flex: 1}}>
                <Appbar.Header>
                        <Appbar.Action icon="close" onPress={() => this.props.navigation.navigate('View')} />
                        <Appbar.Content title={this.props.event.name} subtitle="Event" />
                        <Appbar.Action icon="edit" onPress={() => this.props.navigation.navigate('Edit', { event: this.props.event })} />
                    </Appbar.Header>
                <ScrollView>
                    {this.renderImage()}
                    {this.renderOwner()}
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
                                <Title style={styles.title}>{this.props.event.name}</Title>
                                {distance}
                                {address}
                            </View>
                        </View>

                        <View style={{ margin: 15, marginBottom: 8 }}>
                            <Text style={styles.dates}>
                                {moment(this.props.event.start).format('DD. MMM. HH:MM')}
                                {' - '}
                                {moment(this.props.event.end).format('DD. MMM. HH:MM')}
                            </Text>
                            <Paragraph>{this.props.event.description}</Paragraph>
                        </View>

                        <Query query={JOB_QUERY} variables={{ id: this.props.event.id }}>
                            {({ error, loading, data, refetch }) => {
                                if (!data.event && (error || loading)) return <View />;
                                return (
                                    <Accordion title="Jobs" icon="work" expansion={true} padding={1}>
                                        <NavigationEvents onWillFocus={refetch} />
                                        <JobList jobs={data.event.jobSet} startDate={data.event.start} refetch={refetch} />
                                    </Accordion>
                                );
                            }}
                        </Query>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export const EventDetailModalNavigationMapped = withNamespaces('Navigation')(withMappedNavigationProps()(EventDetailModal));
