// @flow
import type { EventObject } from '../../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { primaryColor, neutralColors } from '../../../../../themes/colors';

type Props = {
    controls: ControlsType,
};
export type ControlsType = {
    view?: any => void,
    edit?: any => void,
    participations?: any => void,
};

export class EventControlBar extends Component<Props> {
    render() {
        return (
            <View style={style.container}>
                {this.props.controls.view && (
                    <TouchableRipple style={style.item} onPress={this.props.controls.view}>
                        <IconFont5 name="eye" size={25} color={primaryColor} />
                    </TouchableRipple>
                )}
                {this.props.controls.edit && (
                    <TouchableRipple style={style.item} onPress={this.props.controls.edit}>
                        <IconFont5 name="edit" size={25} color={primaryColor} />
                    </TouchableRipple>
                )}
                {this.props.controls.participations && (
                    <TouchableRipple style={style.item} onPress={this.props.controls.participations}>
                        <IconAntDesign name="login" size={25} color={primaryColor} />
                    </TouchableRipple>
                )}
            </View>
        );
    }
}

const style = StyleSheet.create({
    item: {
        backgroundColor: neutralColors.surface,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#aaaaaa',
        borderWidth: 1,
    },
    container: {
        height: 35,
        marginTop: 5,
        flex: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
    },
});
