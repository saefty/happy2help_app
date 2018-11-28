// @flow
import React, { Component } from "react";
import { Card, Title, Paragraph } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';


type Props = {
    event: EventObject,
    onEventTouch: (event: EventObject) => void,
};

export class Event extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {    
        // trim description to max 100 characters
        let description = this.props.event.description.length > 100
            ? this.props.event.description.substr(0, 100) + "..."
            : this.props.event.description
        // shows organisation if possible, else creator
        let creator = this.props.event.organisation
            ? this.props.event.organisation.name
            : this.props.event.creator.username;
        // return event card with mock picture
        return (
            <Card onPress={() => this.props.onEventTouch(this.props.event)}>
                <Card.Content>
                    <Card.Cover source={{uri: "https://picsum.photos/200" }} />
                    <Title>{this.props.event.name}</Title>  
                    <Paragraph>{description}</Paragraph>
                    <Paragraph>{creator}</Paragraph>
                </Card.Content>
            </Card>
        );   
    }
}