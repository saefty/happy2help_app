// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { withNamespaces, i18n } from 'react-i18next';
import styles from './participationState.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { primaryColor, statusColors, neutralColors } from './../../../../themes/colors';

type Props = {
    participationState: number,
    style: any,
    t: i18n.t,
};

class ParticipationState_ extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    get StateString(): string {
        let state = this.props.participationState;
        if (state === 1) return this.props.t('participated');
        if (state === 2) return this.props.t('applied');
        if (state === 3) return this.props.t('declined');
        if (state === 4) return this.props.t('accepted');
        if (state === 5) return this.props.t('canceled');
        return '';
    }

    get MainColor(): string {
        let state = this.props.participationState;
        if (state === 2) return primaryColor;
        if (state === 3) return statusColors.alert; //red
        if (state === 4) return statusColors.success; //green
        if (state === 1) return neutralColors.medium;

        return '';
    }

    get IconName(): string {
        let state = this.props.participationState;
        if (state === 2) return 'hourglass-empty';
        if (state === 3) return 'clear';
        if (state === 4) return 'done';
        if (state === 1) return 'done-all';
        return '';
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Icon name={this.IconName} size={24} color={this.MainColor} />
                <Text style={{ color: this.MainColor, marginRight: 10, marginLeft: 10 }}>{this.StateString}</Text>
            </View>
        );
    }
}

export const ParticipationState = withNamespaces(['Job'])(ParticipationState_);
