/* @flow */

import { Component } from 'react';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text, Divider } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SlimDate } from '../../utils/date/slimDate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { neutralColors } from './../../../../themes/colors';
import { primaryColor } from './../../../../themes/colors';
import DateButton from './dateButton';

type Props = {
    startDate?: Date,
    endDate?: Date,
};

type State = {};

export default class StartEndDateButtons extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Start</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Ende</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <DateButton date={new Date()} style={{ width: '50%', borderRightWidth: 1, borderColor: neutralColors.light }} />
                    <DateButton date={new Date()} style={{ width: '50%', borderLeftWidth: 1, borderColor: neutralColors.light }} />
                </View>
                <Divider style={{ backgroundColor: neutralColors.light, margin: 10, height: 2 }} />
            </View>
        );
    }
}
