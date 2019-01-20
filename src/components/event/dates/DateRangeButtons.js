/* @flow */

import { Component } from 'react';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { neutralColors } from '../../../../themes/colors';
import { primaryColor } from '../../../../themes/colors';
import { withTheme } from 'react-native-paper';
import { styles } from './dateRangeButtons.style';

import DateButton from './dateButton/dateButton';
import moment from 'moment';

type Props = {
    startDate: Date,
    endDate: Date,
    updateStart: (date: Date) => void,
    updateEnd: (date: Date) => void,
    errorMessage: string,
    containerStyle?: StyleSheet,
    hideLabels?: boolean,
};

class DateRangeButtons extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderError = () => {
        if (this.props.errorMessage) {
            const paperColors = this.props.theme.colors;
            return <Text style={[{ color: paperColors.error }, styles.errorMessage]}>{this.props.errorMessage}</Text>;
        }
    };

    renderHeadline = () => {
        if (this.props.hideLabels) return null;
        const paperColors = this.props.theme.colors;
        return (
            <View style={styles.headlines}>
                <View style={styles.headline}>
                    <Text style={[{ color: this.props.errorMessage ? paperColors.error : paperColors.text }, styles.headlineText]}>
                        Start
                    </Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={[{ color: this.props.errorMessage ? paperColors.error : paperColors.text }, styles.headlineText]}>
                        Ende
                    </Text>
                </View>
            </View>
        );
    };

    _updateStart = async date => {
        await this.props.updateStart(date);
        if (!this.props.endDate) this.endPicker.showDateTimePicker();
    };

    render() {
        const paperColors = this.props.theme.colors;
        return (
            <View style={{ marginBottom: this.props.errorMessage ? 23 : 15 }}>
                <View style={this.props.containerStyle ? this.props.containerStyle : styles.container}>
                    {this.renderHeadline()}
                    <View style={styles.dateButtonsContainer}>
                        <DateButton
                            date={this.props.startDate}
                            updateDate={this._updateStart}
                            style={[
                                { borderColor: this.props.errorMessage ? paperColors.error : neutralColors.dark },
                                styles.leftDateButton,
                            ]}
                            accentColor={this.props.errorMessage ? paperColors.error : primaryColor}
                        />
                        <DateButton
                            ref={ref => (this.endPicker = ref)}
                            date={this.props.endDate}
                            updateDate={this.props.updateEnd}
                            style={[
                                { borderColor: this.props.errorMessage ? paperColors.error : neutralColors.dark },
                                styles.rightDateButton,
                            ]}
                            accentColor={this.props.errorMessage ? paperColors.error : primaryColor}
                        />
                    </View>
                    <Divider
                        style={[
                            {
                                backgroundColor: this.props.errorMessage ? paperColors.error : neutralColors.dark,
                            },
                            styles.divider,
                        ]}
                    />
                </View>
                {this.renderError()}
            </View>
        );
    }
}

export default withTheme(DateRangeButtons);
