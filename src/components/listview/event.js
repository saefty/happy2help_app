// @flow
import React, { Component } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import color from 'color';
import { styles } from './event.styles.js';

type Props = {
    event: EventObject,
    descriptionMaxLength: number,
    style: any,
    showCreatorName: boolean,
    onEventTouch: (event: EventObject) => void,
};

export class Event extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    orgaEventStyle = () => {
        if (this.props.event.organisation) {
            return styles.highLightStyle;
        }

        return styles.defaultStyle;
    };

    render() {
        return (
            <Card style={[this.props.style, this.orgaEventStyle()]} onPress={() => this.props.onEventTouch(this.props.event)}>
                <Card.Cover source={{ uri: 'https://picsum.photos/200/300/?random' }} />
                <Card.Content>
                    <Title style = {styles.title}>{this.props.event.name}</Title>
                    <Paragraph>{this.formattedDescription}</Paragraph>
                    <Paragraph style={styles.creator}>{this.createdBy}</Paragraph>
                </Card.Content>
            </Card>
        );
    }

    get formattedDescription() {
        return this.props.event.description.length > this.props.descriptionMaxLength
            ? this.props.event.description.substr(0, this.props.descriptionMaxLength) + '...'
            : this.props.event.description;
    }

    get createdBy() {
        return this.props.event.organisation
            ? this.props.event.organisation.name
            : this.props.showCreatorName
            ? this.props.event.creator.username
            : 'private';
    }
}
