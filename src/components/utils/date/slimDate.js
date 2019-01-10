// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './slimDate.style';
import moment from 'moment';

type Props = {
    date: Date,
    accentColor?: String,
};

export class SlimDate extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.day}> {this.props.date.getDate()} </Text>
                <Text style={{ color: this.props.accentColor !== undefined ? this.props.accentColor : 'red' }}>
                    {moment(this.props.date)
                        .format('MMM')
                        .toUpperCase()}
                </Text>
            </View>
        );
    }
}
