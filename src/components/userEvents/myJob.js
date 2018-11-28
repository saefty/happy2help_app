// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import type { Job } from '../../models/job.model';
import styles from './userEvents.styles';
type Props = {
    job: Job,
    participationState: number,
};

export class MyJob extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
            
        return (
            <Card style={styles.margin}>
                <Card.Content>
                    <Title>{this.props.job.name}</Title>  
                    <Paragraph>{this.props.job.description}</Paragraph>
                    <Text>{this.getStateStr(this.props.participationState)}</Text>
                </Card.Content>
            </Card>
        );   
    }
/*
        (1, 'Participated'),
        (2, 'Applied'),
        (3, 'Declined'),
        (4, 'Accepted'),
        (5, 'Canceled'),
*/
    getStateStr(state: number) {
        if (state === 1) return "Participated";
        if (state === 2) return "Applied";
        if (state === 3) return "Declined";
        if (state === 4) return "Accepted";
        if (state === 5) return "Canceled";
        return "";
    }
}