// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Paragraph, Button, Text } from 'react-native-paper';
import type { UserObject } from '../../../models/user.model';
import type { ParticipationEnum } from '../../../models/participation.model';
import { getParticipationType, participationTypes } from '../../../models/participation.model';
import { styles } from './applicantCard.style';
import { statusColors } from '../../../../themes/colors';
import { i18n, withNamespaces} from 'react-i18next';

type Props = {
    id: number,
    user?: UserObject,
    state: ParticipationEnum,
    handleChange: (id: number, state: number) => any,
    onPress: () => void,
    t: i18n.t; 
};

class _ApplicantCard extends Component<Props> {
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
                        <Button mode="text" onPress={this.props.onPress}>
                            <Text style={styles.headerTitle}>{this.props.user.username}</Text>
                        </Button>

                        <Paragraph style={[styles.text, this.styleParticipationState()]}>
                            {this.props.t(getParticipationType(this.props.state))}
                        </Paragraph>
                    </View>
                    {button}
                </Card.Content>
            </Card>
        );
    }
}
export const ApplicantCard = withNamespaces("Participation")(_ApplicantCard);