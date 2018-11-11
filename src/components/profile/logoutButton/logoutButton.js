// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from './logoutButtonStyle';



type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class LogoutButton extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.props.logOut}
                    style={{ margin: 10 }}
                    mode="contained"
                >
                    Log out
                </Button>
            </View>
        );
    }
}
