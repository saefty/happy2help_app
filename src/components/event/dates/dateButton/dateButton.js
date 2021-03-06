/* @flow */

import { Component } from 'react';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Headline } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SlimDate } from '../../../utils/date/slimDate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from '../../../../../themes/colors';
import { styles } from './dateButton.style';
import moment from 'moment';

type Props = {
    date: Date,
    style: StyleSheet,
    updateDate: (date: Date) => void,
    accentColor: String,
};

type State = {
    isDateTimePickerVisible: boolean,
};

export default class DateButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
        };
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date: Date) => {
        this.props.updateDate(date);
        this.hideDateTimePicker();
    };

    _renderValidTime = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <SlimDate accentColor={this.props.accentColor} date={this.props.date} />
                </View>
                <View>
                    <View style={styles.iconTime}>
                        <Icon name="today" color="black" />
                        <Text> {moment(this.props.date).format('DD.MM.YY')}</Text>
                    </View>
                    <View style={styles.iconTime}>
                        <Icon name="access-time" color="black" />
                        <Text> {moment(this.props.date).format('HH:mm')}</Text>
                    </View>
                </View>
            </View>
        );
    };
    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.container}>{this.props.date ? this._renderValidTime() : <Headline> - </Headline>}</View>

                    <DateTimePicker
                        date={this.props.date}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        mode="datetime"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
