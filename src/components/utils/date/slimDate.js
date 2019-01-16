// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './slimDate.style';
import moment from 'moment';

type Props = {
    date: Date,
    accentColor?: String,
    styleContainer?: StyleSheet,
    styleDay?: StyleSheet,
    styleText?: StyleSheet,
};

export class SlimDate extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.styleContainer ? this.props.styleContainer : styles.container}>
                <Text style={this.props.styleDay ? this.props.styleDay : styles.day}> {this.props.date.getDate()} </Text>
                <Text
                    style={{
                        color: this.props.accentColor !== undefined ? this.props.accentColor : 'red',
                        fontSize: this.props.styleText ? this.props.styleText.fontSize : null,
                    }}
                >
                    {moment(this.props.date)
                        .format('MMM')
                        .toUpperCase()}
                </Text>
            </View>
        );
    }
}
