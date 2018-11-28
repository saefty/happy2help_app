// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { SkillList } from '../skillList/skillList';
import { Appbar } from 'react-native-paper';
import { Header } from './header/header';
import { LogoutButton } from './logoutButton/logoutButton';
import { styles } from './viewProfileStyle';
import type { UserObject } from '../../../models/user.model';
import { CreditPoints } from './creditPoints/creditPoints';
import { withNavigation } from 'react-navigation';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject,
};

class ProfileView extends Component<Props> {    

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Content title="" />
                    <Appbar.Action icon="edit" onPress={() => this.props.navigation.navigate('Edit')} />
                    <Appbar.Action icon="more-vert" />
                </Appbar.Header>
                <View>
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <CreditPoints creditPoints={this.props.user.profile.creditPoints} />
                    <SkillList skillObjects={this.props.user.skills} />
                </View>
                <LogoutButton logOut={this.props.screenProps.logOut} />
            </View>
        );
    }
}

export default withNavigation(ProfileView);
