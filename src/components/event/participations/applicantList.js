// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import type { Participation } from '../../../models/participation.model';
import { List, Button, ThemeProvider, Provider } from 'react-native-paper';
import { ApplicantCard } from './applicantCard';
import Accordion from '../../accordion/accordion';
import { H2HTheme } from '../../../../themes/default.theme';

type Props = {
    title: string,
    participationSet: Array<Participation>,
    handleChange: (id: number, state: number) => any,
    onUserPress: (id: number) => void,
};

export class ApplicantList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.participationSet.length == 0) return <View />;
        else
            return (
                <View>
                    <Accordion title={this.props.title} expansion={this.props.participationSet.length <= 5} icon={'work'}>
                        {this.props.participationSet.map(p => (
                            <ApplicantCard
                                key={p.id}
                                id={p.id}
                                user={p.user}
                                state={p.state}
                                onPress={() => {
                                    this.props.onUserPress(p.user.id);
                                }}
                                handleChange={this.props.handleChange}
                            />
                        ))}
                    </Accordion>
                </View>
            );
    }
}
