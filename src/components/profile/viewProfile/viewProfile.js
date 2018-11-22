// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Skills } from '../skills/skills';
import { Appbar } from 'react-native-paper';
import { Header } from './header/header';
import { LogoutButton } from './logoutButton/logoutButton';
import { styles } from './viewProfileStyle';
import type { UserObject } from '../../../models/user.model';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject,
};

export class ProfileView extends Component<Props> {
    constructor(props) {
        super(props);
        console.log(props.user);
    }

    render() {
        
        return (
            <View>
                <Appbar.Header style={styles.appbar}>
                    {/* Need content to get the icon on the right */}
                    <Appbar.Content title="" />
                    <Appbar.Action icon="edit" onPress={console.warn('presses')} />
                    <Appbar.Action icon="more-vert" onPress={console.warn('presses')} />
                </Appbar.Header>
                <View>
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <Skills skillObjects={this.props.user.skills} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}
