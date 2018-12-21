// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import type { Participation } from '../../../models/participation.model';
import { List } from 'react-native-paper';
import { ApplicantCard } from './applicantCard';

type Props = {
    title: string,
    participationSet: Array<Participation>,
    handleChange: (id: number, state: number) => any,
};

export class ApplicantList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.participationSet.length == 0) return <View />;
        else
            return (
                <List.Section>
                    <List.Accordion title={this.props.title}>
                        {this.props.participationSet.map(p => (
                            <ApplicantCard key={p.id} id={p.id} user={p.user} state={p.state} handleChange={this.props.handleChange} />
                        ))}
                    </List.Accordion>
                </List.Section>
            );
    }
}
