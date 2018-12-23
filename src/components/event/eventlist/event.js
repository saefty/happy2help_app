// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import type { EventObject } from '../../../models/event.model';
import type { ControlsType } from './eventControls/eventControlBar';
import { styles } from './event.styles.js';
import { EventControlBar } from './eventControls/eventControlBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    event: EventObject,
    descriptionMaxLength: number,
    showCreatorName: boolean,
    onEventTouch?: (event: EventObject) => void,
    controls?: ControlsType,
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
        let controlBar;
        if (this.props.controls) {
            controlBar = (
                <EventControlBar
                    controls={{
                        view: this.props.controls.view
                            ? () => {
                                  this.props.controls.view(this.props.event);
                              }
                            : undefined,
                        edit: this.props.controls.edit
                            ? () => {
                                  this.props.controls.edit(this.props.event);
                              }
                            : undefined,
                        participations: this.props.controls.participations
                            ? () => {
                                  this.props.controls.participations(this.props.event);
                              }
                            : undefined,
                    }}
                />
            );
        }
        const onPress = !this.props.controls ? () => this.props.onEventTouch(this.props.event) : () => {};
        const distance = this.props.event.location.distance && (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon name="map" size={22} />
                <Paragraph>{this.props.event.location.distance.toFixed(4)}km</Paragraph>
            </View>
        );
        return (
            <Card style={[styles.card, this.orgaEventStyle()]} onPress={onPress}>
                <Card.Cover source={{ uri: 'https://picsum.photos/200/300/?random' }} />
                <Card.Content>
                    <Title style={styles.title}>{this.props.event.name}</Title>
                    <Paragraph>{this.formattedDescription}</Paragraph>
                    <Paragraph style={styles.creator}>{this.createdBy}</Paragraph>
                    {distance}
                </Card.Content>
                {controlBar}
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
