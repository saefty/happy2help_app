/* @flow */

import { Component } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { neutralColors } from '../../../../themes/colors';
import DateButton from './dateButton/dateButton';
import moment from 'moment';

type Props = {
    startDate: Date,
    endDate: Date,
    updateStart: (date: Date) => void,
    updateEnd: (date: Date) => void,
    errorMessage: string,
};

export default class DateRangeButtons extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderError = () => {
        if (this.props.errorMessage) {
            return <Text style={{ color: 'red', fontSize: 12, marginLeft: 10, position: 'absolute', bottom: 9 }}>{this.props.errorMessage}</Text>;
        } 
    };

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
                    <DateButton
                        date={this.props.startDate}
                        updateDate={this.props.updateStart}
                        style={{ width: '50%', borderRightWidth: 1, borderColor: neutralColors.light }}
                    />
                    <DateButton
                        date={this.props.endDate}
                        updateDate={this.props.updateEnd}
                        style={{ width: '50%', borderLeftWidth: 1, borderColor: neutralColors.light }}
                    />
                </View>
                <Divider style={{ backgroundColor: neutralColors.light, margin: 10, marginBottom: 30, height: 2 }} />
                {this.renderError()}
            </View>
        );
    }
}
