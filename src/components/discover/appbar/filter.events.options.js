// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import styles from './filter.styles';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
};

class _FilterOptions extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    get title(): string {
        return this.props.t('filter');
    }

    render() {
        return (
            <View style={styles.titleContainer}>
                <Title style={styles.title}>{this.title}:</Title>
            </View>
        );
    }
}

export const FilterOptions = withNamespaces(['Sort'])(_FilterOptions);
