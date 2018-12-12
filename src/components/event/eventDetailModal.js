// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Modal, Card, Title, Button, Paragraph, Text, Divider, Subheading, Appbar } from 'react-native-paper';
import { JobList } from './job/jobList';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { withNamespaces } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Accordion from '../accordion/accordion';
import { OrganisationView } from '../organisation/viewOrganisation';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    event: EventObject,
};

const JOB_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
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
                participationSet {
                    id
                    state
                }
            }
        }
    }
`;

const ORGANISATION_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            organisation {
                id
                name
                description
                members {
                    id
                    username
                }
                eventSet {
                    id
                    name
                    description
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
                            <View />
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
        return (
            <View>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Action icon="close" onPress={() => this.props.navigation.navigate('View')} />
                        <Appbar.Content title={this.props.event.name} />
                    </Appbar.Header>
                    <View style={{ margin: 14 }}>
                        <Title>
                            {this.props.event.name} - {this.props.event.location ? this.props.event.location.name : ''}
                        </Title>
                        <Paragraph>{this.props.event.description}</Paragraph>
                        <Query query={JOB_QUERY} variables={{ id: this.props.event.id }} cache="no-cache">
                            {({ error, loading, data, refetch }) => {
                                if (error || loading) return <View />;
                                return (
                                    <Accordion title="Jobs" icon="work" expansion={true}>
                                        <JobList jobs={data.event.jobSet} refetch={refetch} />
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
