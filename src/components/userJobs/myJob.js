// @flow
import React, { Component } from 'react';
import { View } from 'react-native';

import { Card, Title, Paragraph, Text } from 'react-native-paper';
import type { Job } from '../../models/job.model';

import { withNamespaces, i18n } from 'react-i18next';
import styles from './userJobs.styles';
import { withNavigation } from 'react-navigation';
import { ParticipationState } from './participationState/participationState';

type Props = {
    job: Job,
    participationState: number,
    t: i18n.t,
    openEventDetails: any => void,
};

class MyJobComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Card
                style={styles.card}
                onPress={() => {
                    this.props.openEventDetails(this.props.job.event);
                }}
            >
                <Card.Content>
                    <View>
                        <Title>{this.props.job.name}</Title>
                        <Text>
                            {/* bei dem Event {this.props.job.event.name} von der Organisation {this.props.job.event.organisation.name} */}
                        </Text>
                        <Paragraph>{this.props.job.description}</Paragraph>
                        <ParticipationState style={{ marginTop: 20 }} participationState={this.props.participationState} />
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

export const MyJob = withNamespaces(['Job'])(MyJobComponent);
