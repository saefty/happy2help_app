// @flow
import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { withNamespaces, i18n } from 'react-i18next';
import { styles } from './applyButton.styles';

type Props = {
    t: i18n.t,
    disabled: boolean,
    applyFilter: () => void,
};

class _ApplyButton extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.applyFilter}>
                <View style={styles.container}>
                    <Text style={[styles.text, this.props.disabled ? styles.disabled : styles.enabled]}>{this.props.t('apply')}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export const ApplyButton = withNamespaces(['Sort'])(_ApplyButton);
