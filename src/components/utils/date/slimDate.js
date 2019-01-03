// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './slimDate.style';

type Props = {
    t: i18n.t,
    date: Date,
    accentColor?: String,
};

export class SlimDate extends Component<Props> {
    constructor(props) {
        super(props);
    }

    getMonthString = (monthIndex: number) => {
        switch (monthIndex+1) {
            case 1:
                return 'JAN';
            case 2:
                return 'FEB';
            case 3:
                return 'MÄR';
            case 4:
                return 'APR';
            case 5:
                return 'MAI';
            case 6:
                return 'JUN';
            case 7:
                return 'JUL';
            case 8:
                return 'AUG';
            case 9:
                return 'SEP';
            case 10:
                return 'OKT';
            case 11:
                return 'NOV';
            case 12:
                return 'DEZ';
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.day}> {this.props.date.getDate()} </Text>
                <Text style={{ color: this.props.accentColor !== undefined ? this.props.accentColor : 'red' }}> {this.getMonthString(this.props.date.getMonth())} </Text>
            </View>
        );
    }
}
