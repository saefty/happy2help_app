// @flow
import type { Job } from '../../models/job.model';
import type { Participation } from '../../models/participation.model';

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { compose, graphql } from 'react-apollo';
import { CREATE_PARTICIPATION, UPDATE_PARTICIPATION } from '../../event/participations/participation.mutation';
import { participationTypes } from '../../../models/participation.model';
import { clone } from '../../../helpers/clone';
import { UserParticipation } from './../participation/userParticipation';

type Props = {
    jobs: Job[],
    participationSet: Array<any>,
    createParticipation: graphql.mutate,
    updateParticipation: graphql.mutate,
    refetch: () => any,
};

class _UserParticipationsList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    // sort events by their latest event start date
    sortJobsByStartDate = jobs => {
        let sortedJobs = clone(jobs);
        sortedJobs = sortedJobs.sort((a, b) => {
            return new Date(a.event.start) - new Date(b.event.start);
        });
        return sortedJobs.reverse();
    };

    createParticipation = async (job: Job, participation: Participation) => {
        if (job.currentUsersParticipation) {
            await this.updateParticipation(job, participation, true);
        } else {
            await this.props.createParticipation({
                variables: {
                    jobId: job.id,
                },
            });
        }
    };

    updateParticipation = async (job: Job, participation: Participation, apply?: boolean) => {
        await this.props.updateParticipation({
            variables: {
                participationId: participation.id,
                state: apply ? participationTypes.Applied : participationTypes.Canceled,
            },
        });
    };

    renderParticipation = ({ item: job }) => {
        if (job.currentUsersParticipation !== null && job.currentUsersParticipation.state == 5) return;
        return (
            <Card style={{ marginBottom: 12, borderRadius: 0 }}>
                <Card.Content>
                    <UserParticipation
                        updateParticipation={this.updateParticipation}
                        createParticipation={this.createParticipation}
                        job={job}
                    />
                </Card.Content>
            </Card>
        );
    };

    render() {
        return (
            <FlatList
                data={this.sortJobsByStartDate(this.props.participationSet.map(participation => participation.job))}
                keyExtractor={job => job.id}
                renderItem={this.renderParticipation}
            />
        );
    }
}

export const UserParticipationsList = compose(
    graphql(CREATE_PARTICIPATION, { name: 'createParticipation' }),
    graphql(UPDATE_PARTICIPATION, { name: 'updateParticipation' })
)(_UserParticipationsList);
