// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Skills } from './skills/skills';
import { Appbar } from 'react-native-paper';
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
                id: 0,
            },
            {
                text: 'Computerexperte',
                approved: false,
                id: 1,
            },
        ];
        return (
            <View>
                <Appbar.Header style={styles.appbar}>
                    {/* Need content to get the icon on the right */}
                    <Appbar.Content title="" />
                    <Appbar.Action icon="edit" onPress={console.warn('pressed')} />
                    <Appbar.Action icon="more-vert" onPress={console.warn('presses')} />
                </Appbar.Header>
                <View>
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <Skills skillObjects={skillObjects} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}
