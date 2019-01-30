// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import type { UserObject } from '../../../models/user.model';
import type { ParticipationEnum } from '../../../models/participation.model';
import { getParticipationType, participationTypes } from '../../../models/participation.model';
import { styles } from './applicantCard.style';
import { statusColors } from '../../../../themes/colors';

type Props = {
    id: number,
    user?: UserObject,
    state: ParticipationEnum,
    handleChange: (id: number, state: number) => any,
};

export class ApplicantCard extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    renderAcceptButton() {
        return (
            <Button
                mode="outlined"
                color={statusColors.success}
                onPress={() => this.props.handleChange(this.props.id, participationTypes.Accepted)}
            >
                ANNEHMEN
            </Button>
        );
    }

    renderDeclineButton() {
        return (
            <Button
                mode="outlined"
                color={statusColors.alert}
                onPress={() => this.props.handleChange(this.props.id, participationTypes.Declined)}
            >
                ABLEHNEN
            </Button>
        );
    }

    styleParticipationState() {
        return getParticipationType(this.props.state) === 'Applied'
            ? styles.textApplied
            : getParticipationType(this.props.state) === 'Accepted'
            ? styles.textAccepted
            : styles.textElse;
    }
    render() {
        const button = [participationTypes.Applied, participationTypes.Declined].includes(this.props.state)
            ? this.renderAcceptButton()
            : this.renderDeclineButton();
        return (
            <Card>
                <Card.Content>
                    <View style={styles.header}>
                        <Title style={styles.headerTitle}>{this.props.user.username}</Title>
                        <Paragraph style={[styles.text, this.styleParticipationState()]}>
                            {getParticipationType(this.props.state)}
                        </Paragraph>
                    </View>
                    {button}
                </Card.Content>
            </Card>
        );
    }
}
