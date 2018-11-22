// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { styles } from './creditPointsStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNamespaces, i18n } from 'react-i18next';


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
            <View style={styles.view}>
                <Divider style={styles.divider} />
                <View style={styles.outerContainer}>
                    <Text style={styles.title}>{this.props.t('creditPoints')}</Text>
                    <View style={styles.innerContainer}>
                        <Icon name="attach-money" size={30} />
                        <Text style={styles.creditPoints}>{this.props.creditPoints}</Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
            </View>
        );
    }
}

export const CreditPoints = withNamespaces(['User'])(CreditPointsComponent);
