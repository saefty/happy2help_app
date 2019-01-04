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
import moment from 'moment';

type Props = {
    date: Date,
    style: StyleSheet,
};

type State = {
    isDateTimePickerVisible: boolean,
    date: Date,
};

export default class DateButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            date: props.date,
        };
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = date => {
        this.setState({date: date});
        this.hideDateTimePicker();
    };

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <SlimDate accentColor={primaryColor} date={this.state.date} />
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="today" color="black" />
                                <Text> {moment(this.state.date).format('DD.MM.YY')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="access-time" color="black" />
                                <Text> {moment(this.state.date).format('HH:mm')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode="datetime"
                />
            </View>
        );
    }
}
