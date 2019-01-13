// @flow
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import type { EventObject } from '../../../models/event.model';
import type { ControlsType } from './eventControls/eventControlBar';
import { styles } from './event.styles.js';
import { EventImage } from '../event.image.js';
import { EventControlBar } from './eventControls/eventControlBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SlimDate } from './../../utils/date/slimDate';
import { statusColors } from './../../../../themes/colors';
import moment from 'moment';

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

    renderVerifiedOrgaIcon = () => {
        if (this.props.event.organisation) {
            return <Icon name="check-circle" size={14} color={statusColors.success} style={{ top: 1, marginLeft: 5 }} />;
        }
        return null;
    };

    renderCoverImage = () => {
        if (this.props.event.organisation) {
            return (
                <View style={styles.coverContainer}>
                    <EventImage style={styles.cover} src={this.props.event.image ? this.props.event.image.url : ''} resizeMode={'cover'} />
                </View>
            );
        }
        return null;
    };

    renderDistanceToUser = () => {
        if (this.props.controls) {
            return null;
        }
        return (
            <View style={styles.distanceContainer}>
                <Icon name="location-on" size={14} style={{ top: 2 }} />
                <Text style={styles.distance}> {this.distanceString}</Text>
            </View>
        );
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

        return (
            <Card style={[styles.card]} onPress={onPress}>
                {this.renderCoverImage()}
                <Card.Content>
                    <View style={styles.contentContainer}>
                        <View style={styles.dateContainer}>
                            <SlimDate date={new Date(this.props.event.start)} />
                        </View>
                        <View style={styles.rightContent}>
                            <Text style={styles.title}>{this.props.event.name}</Text>
                            <View style={styles.creatorContainer}>
                                <Text style={styles.creatorText}>{this.createdBy}</Text>
                                {this.renderVerifiedOrgaIcon()}
                            </View>
                            <Text style={styles.dates}>
                                {moment(this.props.event.start).format('DD. MMM. HH:MM')}
                                {' - '}
                                {moment(this.props.event.end).format('DD. MMM. HH:MM')}
                            </Text>
                            <Text style={styles.location}>{this.props.event.location.name}</Text>
                            {this.renderDistanceToUser()}                       
                        </View>
                    </View>
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

    get distanceString() {
        const distance = this.props.event.location.distance;
        if (distance < 1) {
            return String((distance * 100).toFixed(0) + ' m entfernt');
        }
        if (distance < 10) {
            return String(distance.toFixed(1) + ' km entfernt');
        }
        return String(distance.toFixed(0) + ' km entfernt');
    }
}
