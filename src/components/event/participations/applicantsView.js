// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import type { EventObject } from '../../../models/event.model';
import { ApplicantList } from './applicantList';
import { styles } from './applicantView.style';
import { graphql, compose } from 'react-apollo';
import * as mutations from './participation.mutation';

type Props = {
    event: EventObject,
    refetch: () => EventObject,
    updateParticipation: graphql.mutate,
};

class _ApplicantsView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    update = (id: number, state: number) => {
        return this.props.updateParticipation({
            variables: {
                participationId: id,
                state: state,
            },
        });
    };

    handleChange = async (id: number, state: number) => {
        await this.update(id, state);
        return;
    };

    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{this.props.event.name}</Text>
                </View>
                {this.props.event.jobSet.map(job => (
                    <ApplicantList key={job.id} title={job.name} participationSet={job.participationSet} handleChange={this.handleChange} />
                ))}
            </View>
        );
    }
}

export const ApplicantsView = compose(graphql(mutations.UPDATE_PARTICIPATION, { name: 'updateParticipation' }))(_ApplicantsView);
