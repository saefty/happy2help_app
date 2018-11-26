// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph } from 'react-native-paper';
import type { Job } from '../../models/job.model';

type Props = {
    job: Job,
};

export class MyJob extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
            
        return (
            <Card>
                <Card.Content>
                    <Title>{this.props.job.name}</Title>  
                    <Paragraph>{this.props.job.description}</Paragraph>
                </Card.Content>
            </Card>
        );   
    }
}