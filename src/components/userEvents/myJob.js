// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import type { Job } from '../../models/job.model';
import { withNamespaces, i18n } from 'react-i18next';


type Props = {
    job: Job,
    participationState: number,
    style: any ,
    t: i18n.t,
};

class MyJobComponent extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
            
        return (
            <Card style={this.props.style}>
                <Card.Content>
                    <Title>{this.props.job.name}</Title>  
                    <Paragraph>{this.props.job.description}</Paragraph>
                    <Text>{this.StateString}</Text>
                </Card.Content>
            </Card>
        );   
    }

    get StateString() {
        let state = this.props.participationState;
        if (state === 1) return this.props.t("participated");
        if (state === 2) return this.props.t("applied");
        if (state === 3) return this.props.t("declined");
        if (state === 4) return this.props.t("accepted");
        if (state === 5) return this.props.t("canceled");
        return "";
    }
}

export const MyJob = withNamespaces(['Job'])(MyJobComponent);