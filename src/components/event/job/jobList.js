// @flow
import type { Job } from '../../../models/job.model';
import type { Participation } from '../../../models/participation.model';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card } from 'react-native-paper';
import { compose, graphql } from 'react-apollo';
import { CREATE_PARTICIPATION, UPDATE_PARTICIPATION } from '../participations/participation.mutation';
import { participationTypes } from '../../../models/participation.model';
import { JobListItem } from './jobListItem';
import { clone } from './../../../helpers/clone';
import styles from './jobListItem.style';

type Props = {
    jobs: Job[],
    participations?: Participation[],
    createParticipation: graphql.mutate,
    updateParticipation: graphql.mutate,
    refetch: () => any,
};

class _JobList extends Component<Props> {
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
        await this.props.refetch();
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
        return (
            <Card style={{ margin: 10 }}>
                <Card.Content>
                    <JobListItem
                        job={job}
                        updateParticipation={this.updateParticipation}
                        createParticipation={this.createParticipation}
                        startDate={this.props.startDate}
                    />
                </Card.Content>
            </Card>
        );
    };

    jobParticipationCount = (job: Job) => {
        return job.participationSet.filter(x => x.state !== participationTypes.Accepted).length;
    };

    //clones the given jobs and sorts them by their open positions
    getSortedJobs = () => {
        let sortedJobs = clone(this.props.jobs);
        sortedJobs = sortedJobs.sort((a, b) => {
            return this.jobParticipationCount(a) - this.jobParticipationCount(b);
        });
        return sortedJobs;
    };

    render() {
        return <FlatList data={this.getSortedJobs()} keyExtractor={job => job.id} renderItem={this.renderJob} />;
    }
}

export const JobList = compose(
    graphql(CREATE_PARTICIPATION, { name: 'createParticipation' }),
    graphql(UPDATE_PARTICIPATION, { name: 'updateParticipation' })
)(_JobList);
