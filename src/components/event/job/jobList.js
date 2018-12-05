// @flow
import type { Job } from '../../../models/job.model'
import type { Participation } from '../../../models/participation.model'

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { CREATE_PARTICIPATION, UPDATE_PARTICIPATION } from '../participation.mutation';
import { participationTypes } from '../../../models/participation.model';
import { JobListItem } from './jobListItem';

type Props = {
    jobs: Job[],
    participations?: Participation[],
    createParticipation: graphql.mutate,
    updateParticipation: graphql.mutate,
    refetch: () => any,
}

class _JobList extends Component<Props> {
    
    constructor(props: Props) {
        super(props);
    }

    createParticipation = async (job: Job, participation: Participation) => {
        if(job.currentUsersParticipation) {
            await this.updateParticipation(job, participation, true)
        }else {
            await this.props.createParticipation({
                variables: {
                    jobId: job.id
                }
            })
        }
        await this.props.refetch();
    }

    updateParticipation = async (job: Job, participation: Participation, apply?: boolean) => {
        await this.props.updateParticipation({
            variables: {
                participationId: participation.id,
                state: apply ? participationTypes.Applied : participationTypes.Canceled
            }
        });
        await this.props.refetch();
    }

    renderJob = ({ item: job }) => {
        return (
            <JobListItem 
                job={job} 
                updateParticipation={this.updateParticipation} 
                createParticipation={this.createParticipation}
            />
        )
    }

    render() {
      return (
        <FlatList
            data={this.props.jobs}
            keyExtractor={(job) => job.id} 
            renderItem={this.renderJob}
        />
      )
    }
}

export const JobList = compose(
    graphql(CREATE_PARTICIPATION, { name: 'createParticipation' }),
    graphql(UPDATE_PARTICIPATION, { name: 'updateParticipation' })
)(_JobList);

