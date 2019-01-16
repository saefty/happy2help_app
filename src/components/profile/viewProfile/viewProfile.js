// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './header/header';
import type { UserObject } from '../../../models/user.model';
import { CreditPoints } from './creditPoints/creditPoints';
import { withNavigation } from 'react-navigation';
import { withNamespaces, i18n } from 'react-i18next';
import { MySkills } from './skillList/mySkillList';
import { styles } from './viewProfile.style';

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
            <View style={styles.container}>
                <Header userName={this.props.user.username} img={this.props.user.image} location={this.props.user.profile.location} />
                <MySkills skills={this.props.user.skills} title={this.props.t('skills')} />
            </View>
        );
    }
}

export default withNavigation(withNamespaces(['User'])(ProfileView));
