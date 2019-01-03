// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Switch, Paragraph } from 'react-native-paper';
import styles from './filter.styles';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    showPrivateEvents: boolean,
    handleSwitch: () => void,
};

class _FilterOptions extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    get title(): string {
        return this.props.t('filter');
    }

    get switchInfo(): string {
        return this.props.t(this.props.showPrivateEvents === true ? 'on' : 'off');
    }
    render() {
        return (
            <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>{this.title}</Title>
                </View>
                <View style={styles.switchContainer}>
                    <View style={styles.switchTextContainer}>
                        <Paragraph style={styles.switchText}>
                            {this.props.t('showPrivateEvents')} {this.switchInfo}
                        </Paragraph>
                    </View>
                    <Switch value={this.props.showPrivateEvents} onValueChange={this.props.handleSwitch} />
                </View>
            </View>
        );
    }
}

export const FilterOptions = withNamespaces(['Sort'])(_FilterOptions);
