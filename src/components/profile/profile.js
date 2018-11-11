// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Skills } from './skills/skills';
import { Header } from './header/header';
import { LogoutButton } from './logoutButton/logoutButton';
import { styles } from './profileScreenStyle';
import { UserObject } from '../../models/user.model';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject,
};

export class ProfileView extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        //this will be replaced if the backend is ready to pass the user's skills
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
            // <View style={styles.outerContainer}>
            <View >
                {/* <View style={styles.innerContainer}> */}
                <View >
                    <Header
                        userName={this.props.user.username}
                        location={this.props.user.profile.location}
                    />
                    <Skills skillObjects={skillObjects} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}
