// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';


type Props = {
    event: EventObject,
    descriptionMaxLength: number,
    style: any,
    showCreatorName: boolean,
};

export class Event extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {    
        return (
            <Card style={this.props.style}>
                <Card.Content>
                    <Card.Cover source={{uri: "https://picsum.photos/200/300/?random" }} />
                    <Title>{this.props.event.name}</Title>  
                    <Paragraph>{this.formattedDescription}</Paragraph>
                    <Paragraph>{this.createdBy}</Paragraph>
                </Card.Content>
            </Card>
        );   
    }

    get formattedDescription() {
        return this.props.event.description.length > this.props.descriptionMaxLength
        ? this.props.event.description.substr(0, this.props.descriptionMaxLength) + "..."
        : this.props.event.description;
    }

    get createdBy() {
        return this.props.event.organisation
        ? this.props.event.organisation.name
        :  this.props.showCreatorName
            ? this.props.event.creator.username
            : "private"
        ;
    }
}