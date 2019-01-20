// @flow
import type { EventObject } from '../../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './eventControlBar.styles';
import { neutralTextColors } from '../../../../../themes/colors';

import { withNamespaces } from 'react-i18next';

type Props = {
    controls: ControlsType,
};
export type ControlsType = {
    viewApplications?: any => void,
    edit?: any => void,
    checkIn?: any => void,
};

export class _EventControlBar extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {this.props.controls.edit && (
                    <TouchableRipple style={styles.itemLeft} onPress={this.props.controls.edit}>
                        <View style={styles.textIconContainer}>
                            <IconMaterial name="edit" size={25} color={neutralTextColors.medium} />
                            <Text style={styles.text}>{this.props.t('edit')}</Text>
                        </View>
                    </TouchableRipple>
                )}
                {this.props.controls.viewApplications && (
                    <TouchableRipple style={styles.itemLeft} onPress={this.props.controls.viewApplications}>
                        <View style={styles.textIconContainer}>
                            <IconMaterial name="reply" size={25} color={neutralTextColors.medium} />
                            <Text style={styles.text}>{this.props.t('applications')}</Text>
                        </View>
                    </TouchableRipple>
                )}
                {this.props.controls.checkIn && (
                    <TouchableRipple style={styles.itemRight} onPress={this.props.controls.checkIn}>
                        <View style={styles.textIconContainer}>
                            <IconMaterialCommunity name="qrcode-scan" size={20} color={neutralTextColors.medium} />
                            <Text style={styles.text}>Check-in</Text>
                        </View>
                    </TouchableRipple>
                )}
            </View>
        );
    }
}

export const EventControlBar = withNamespaces(['Event'])(_EventControlBar);
