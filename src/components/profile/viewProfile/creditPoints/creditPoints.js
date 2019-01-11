// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './creditPointsStyle';
import { withNamespaces, i18n } from 'react-i18next';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { H2HTheme } from '../../../../../themes/default.theme';

type Props = {
    t: i18n.t,
    creditPoints: number,
};

class CreditPointsComponent extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <IconMat name="favorite" size={20} color={H2HTheme.colors.primary} />
                <Text style={styles.title}>{this.props.t('creditPoints')}</Text>
                <Text style={styles.creditPoints}>{this.props.creditPoints}</Text>
            </View>
        );
    }
}

export const CreditPoints = withNamespaces(['User'])(CreditPointsComponent);
