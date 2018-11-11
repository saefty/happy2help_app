// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Skills } from '../../components/profile/skills/skills';
import { Header } from '../../components/profile/header/header';
import { LogoutButton } from '../../components/profile/logoutButton/logoutButton';
import { styles } from './profileScreenStyle';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class ProfileView extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        let skillObjects = [
            {
                text: 'Hygiene Karte',
                approved: true,
            },
            {
                text: 'Computerexperte',
                approved: false,
            },
        ];
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Header />
                    <Skills skillObjects={skillObjects} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}

