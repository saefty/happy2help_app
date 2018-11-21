// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { SkillList } from './skillList/skillList';
import { Header } from './header/header';
import { LogoutButton } from './logoutButton/logoutButton';
import { styles } from './profileScreenStyle';
import { UserObject } from '../../models/user.model';
import { CreditPoints } from './creditPoints/creditPoints';

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
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <CreditPoints creditPoints={this.props.user.profile.creditPoints} /> 
                    <SkillList skillObjects={skillObjects} />
                </View>
                <LogoutButton {...this.props} />
            </View>
        );
    }
}
