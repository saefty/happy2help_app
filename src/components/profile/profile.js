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
            // <View style={styles.outerContainer}>
            <View>
                {/* <View style={styles.innerContainer}> */}
                <View>
                    <Appbar style={styles.bottom}>
                        <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
                        <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
                        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
                        <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
                    </Appbar>
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <Skills skillObjects={skillObjects} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}
