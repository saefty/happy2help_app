// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { RadioButton, Text, Title, TouchableRipple } from 'react-native-paper';
import styles from './sort.styles';
import { withNamespaces, i18n } from 'react-i18next';
import { filterColors } from '../../../../../themes/colors';

type Props = {
    t: i18n.t,
    sorting: string,
    descending: boolean,
    changeSort: (sorting: string) => any,
    changeDescending: (descending: boolean) => any,
};
class _SortOption extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }
    get transparent() {
        return 'rgba(0, 0, 0, .0)';
    }
    get sortInfo(): string {
        if (!this.props.t(this.props.sorting)) return this.props.t('sort');
        let title = this.props.t(this.props.sorting);
        if (this.props.sorting !== 'distance') {
            title += ' (';
            title += this.props.descending === true ? this.props.t('descending') : this.props.t('ascending');
            title += ')';
        }
        return title;
    }
    get desc(): string {
        return this.props.sorting === `distance` ? `unchecked` : this.props.descending ? `checked` : `unchecked`;
    }

    get asc(): string {
        return this.props.sorting === `distance` ? `checked` : this.props.descending ? `unchecked` : `checked`;
    }

    render() {
        return (
            <View style={styles.sortContainer}>
                <Title style={styles.title}>{this.props.t('sort')}</Title>
                <View style={styles.radioContainer}>
                    <TouchableRipple rippleColor={this.transparent} onPress={() => this.props.changeDescending(false)}>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value={this.props.t('ascending')}
                                color={filterColors.active}
                                status={this.asc}
                                onPress={() => this.props.changeDescending(false)}
                                disabled={this.props.sorting === 'distance'}
                            />
                            <Text style={styles.radioButtonText}>{this.props.t('ascending')}</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple rippleColor={this.transparent} onPress={() => this.props.changeDescending(true)}>
                        <View style={styles.radioButton}>
                            <Text style={styles.radioButtonText}>{this.props.t('descending')}</Text>
                            <RadioButton
                                value={this.props.t('descending')}
                                color={filterColors.active}
                                status={this.desc}
                                onPress={() => this.props.changeDescending(true)}
                                disabled={this.props.sorting === 'distance'}
                            />
                        </View>
                    </TouchableRipple>
                </View>
                <View style={styles.optionList}>
                    <TouchableRipple rippleColor={this.transparent} onPress={() => this.props.changeSort('name')}>
                        <View
                            style={[
                                styles.optionView,
                                { borderColor: this.props.sorting === 'name' ? filterColors.active : filterColors.inactive },
                            ]}
                        >
                            <Text style={styles.optionText}>{this.props.t('name')}</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple rippleColor={this.transparent} onPress={() => this.props.changeSort('distance')}>
                        <View
                            style={[
                                styles.optionView,
                                { borderColor: this.props.sorting === 'distance' ? filterColors.active : filterColors.inactive },
                            ]}
                        >
                            <Text style={styles.optionText}>{this.props.t('distance')}</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple rippleColor={this.transparent} onPress={() => this.props.changeSort('start')}>
                        <View
                            style={[
                                styles.optionView,
                                { borderColor: this.props.sorting === 'start' ? filterColors.active : filterColors.inactive },
                            ]}
                        >
                            <Text style={styles.optionText}>{this.props.t('start')}</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        );
    }
}

export const SortOptions = withNamespaces(['Sort'])(_SortOption);
