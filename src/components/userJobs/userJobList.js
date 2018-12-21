// @flow
import type { Job } from '../../models/job.model';
import type { Participation } from '../../models/participation.model';

import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { compose, graphql } from 'react-apollo';
import { CREATE_PARTICIPATION, UPDATE_PARTICIPATION } from './../event/participations/participation.mutation';
import { participationTypes } from '../../models/participation.model';
import { JobListItem } from './../event/job/jobListItem';

type Props = {
    jobs: Job[],
    participationSet: Array<any>,
    createParticipation: graphql.mutate,
    updateParticipation: graphql.mutate,
    refetch: () => any,
};

class _UserJobList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

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

    renderJob = ({ item: job }) => {
        if (job.currentUsersParticipation !== null && job.currentUsersParticipation.state == 5) return;
        return (
            <Card style={{ margin: 10 }}>
                <Card.Content>
                    <JobListItem
                        job={job}
                        updateParticipation={this.updateParticipation}
                        createParticipation={this.createParticipation}
                        startDate={job.event.start}
                    />
                </Card.Content>
            </Card>
        );
    };

    render() {
        return (
            <FlatList
                data={this.props.participationSet.map(participation => participation.job)}
                keyExtractor={job => job.id}
                renderItem={this.renderJob}
            />
        );
    }
}

export const UserJobList = compose(
    graphql(CREATE_PARTICIPATION, { name: 'createParticipation' }),
    graphql(UPDATE_PARTICIPATION, { name: 'updateParticipation' })
)(_UserJobList);
