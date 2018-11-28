// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import styles from './userEvents.styles';

type Props = {
    event: EventObject,
};

export class MyEvent extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {    
        let description = this.props.event.description.length > 50
            ? this.props.event.description.substr(0, 50) + "..."
            : this.props.event.description
        let creator = this.props.event.organisation
            ? "As Admin for: " + this.props.event.organisation.name
            : "private";
        return (
            <Card style={styles.margin}>
                <Card.Content>
                    <Title>{this.props.event.name}</Title>  
                    <Paragraph>{description}</Paragraph>
                    <Paragraph>{creator}</Paragraph>
                </Card.Content>
            </Card>
        );   
    }
}