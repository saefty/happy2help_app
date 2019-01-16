// @flow
import type { EventObject } from '../../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './eventControlBar.styles';
import { neutralTextColors } from '../../../../../themes/colors';

type Props = {
    controls: ControlsType,
};
export type ControlsType = {
    viewApplications?: any => void,
    edit?: any => void,
    checkIn?: any => void,
};

export class EventControlBar extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableRipple style={styles.itemLeft} onPress={this.props.controls.viewApplications}>
                        <View style={styles.textIconContainer}>
                        <IconMaterial name="reply" size={25} color={neutralTextColors.medium} />
                            <Text style={styles.text}>Bewerbungen</Text>
                        </View>
                    </TouchableRipple>
                {this.props.controls.edit && (
                    <TouchableRipple style={styles.itemLeft} onPress={this.props.controls.edit}>
                        <View style={styles.textIconContainer}>
                            <IconMaterial name="edit" size={25} color={neutralTextColors.medium} />
                            <Text style={styles.text}>Bearbeiten</Text>
                        </View>
                    </TouchableRipple>
                )}
                {this.props.controls.checkIn && (
                    <TouchableRipple style={styles.itemRight} onPress={this.props.controls.checkIn}>
                        <View style={styles.textIconContainer}>
                            <IconMaterialCommunity name="qrcode-scan" size={20} color={neutralTextColors.medium} />
                            <Text style={styles.text}>Check in</Text>
                        </View>
                    </TouchableRipple>
                )}
            </View>
        );
    }
}
