// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import type { Job } from '../../models/job.model';

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
            <Card style={{margin: 5}}>
                <Card.Content>
                    <Title>{this.props.job.name}</Title>  
                    <Paragraph>{this.props.job.description}</Paragraph>
                    <Text>{this.getStateStr(this.props.participationState)}</Text>
                </Card.Content>
            </Card>
        );   
    }

    getStateStr(state: number) {
        if (state === 0) return "";
        if (state === 1) return "";
        if (state === 2) return "";
        return "stateNotFound";
    }
}