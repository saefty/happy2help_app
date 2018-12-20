// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { SkillList } from '../skillList/skillList';
import { Appbar, Title } from 'react-native-paper';
import { Header } from './header/header';
import { LogoutButton } from './logoutButton/logoutButton';
import { styles } from './viewProfileStyle';
import type { UserObject } from '../../../models/user.model';
import { CreditPoints } from './creditPoints/creditPoints';
import { withNavigation } from 'react-navigation';
import { withNamespaces, i18n } from 'react-i18next';


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
                <View>
                    <Header userName={this.props.user.username} location={this.props.user.profile.location} />
                    <CreditPoints creditPoints={this.props.user.profile.creditPoints} />
                    <Title style={styles.title}>{this.props.t('skills')}</Title>
                    <SkillList skillObjects={this.props.user.skills} />
                </View>
            </View>
        );
    }
}

export default withNavigation(withNamespaces(['User'])(ProfileView));
