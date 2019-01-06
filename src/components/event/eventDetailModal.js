// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Paragraph, Text, Divider, Subheading, Appbar } from 'react-native-paper';
import { JobList } from './job/jobList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';
import Accordion from '../accordion/accordion';
import { OrganisationView } from '../organisation/viewOrganisation';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationEvents } from 'react-navigation';

type Props = {
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
                        url
                    }
                }
            }
        }
    }
`;

export class EventDetailModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    openEventOrganisationScreen = org => {
        this.props.navigation.navigate('DetailedOrganisationView', {
            organisation: org,
        });
    };

    renderCreator = () => {
        return <Text>{this.props.event.creator.username}</Text>;
    };

    renderOrganization = () => {
        return (
            <Query query={ORGANISATION_QUERY} variables={{ id: this.props.event.id }} cache="network-only">
                {({ error, loading, data }) => {
                    if (error || loading) return <View />;
                    return (
                        <View>
                            <OrganisationView
                                organisation={data.event.organisation}
                                showImage={false}
                                showEvents={false}
                                openOrga={() => {
                                    this.openEventOrganisationScreen(data.event.organisation);
                                }}
                            />
                            <Divider />
                        </View>
                    );
                }}
            </Query>
        );
    };

    renderOwner = () => {
        let heading = '';
        let component = <Paragraph />;
        if (this.props.event.organisation) {
            component = this.renderOrganization();
        } else if (this.props.event.creator) {
            heading = 'User:';
            component = this.renderCreator();
        }
        return (
            <View>
                <Subheading style={{ flex: 0, marginTop: 5 }}>{heading}</Subheading>
                <View style={{ flex: 0, marginLeft: 0 }}>{component}</View>
            </View>
        );
    };

    render() {
        if (!this.props.event) return <Text />;
        const distance = this.props.event.location.distance && (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon name="map" size={25} />
                <Subheading>{this.props.event.location.distance.toFixed(4)}km</Subheading>
            </View>
        );
        return (
            <View>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Action icon="close" onPress={() => this.props.navigation.navigate('View')} />
                        <Appbar.Content title={this.props.event.name} />
                        <Appbar.Action icon="edit" onPress={() => this.props.navigation.navigate('Edit', { event: this.props.event })} />
                    </Appbar.Header>
                    <View style={{ margin: 14 }}>
                        <Title>
                            {this.props.event.name} - {this.props.event.location ? this.props.event.location.name : ''}
                        </Title>
                        {distance}
                        <Paragraph>{this.props.event.description}</Paragraph>
                        <Query query={JOB_QUERY} variables={{ id: this.props.event.id }}>
                            {({ error, loading, data, refetch }) => {
                                if (error || loading) return <View />;
                                return (
                                    <Accordion title="Jobs" icon="work" expansion={true}>
                                        <NavigationEvents onWillFocus={refetch} />
                                        <JobList jobs={data.event.jobSet} startDate={data.event.start} refetch={refetch} />
                                    </Accordion>
                                );
                            }}
                        </Query>
                        {this.renderOwner()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export const EventDetailModalNavigationMapped = withNamespaces('Navigation')(withMappedNavigationProps()(EventDetailModal));
