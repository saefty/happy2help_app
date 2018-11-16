// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './logoutButtonStyle';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

class LogoutButtonComponent extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button onPress={this.props.logOut} style={styles.logoutButton} mode="contained">
                    {this.props.t('logOut')}
                </Button>
            </View>
        );
    }
}

export const LogoutButton = withNamespaces(['User'])(LogoutButtonComponent);
