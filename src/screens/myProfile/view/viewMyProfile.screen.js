// @flow
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ProfileDataProvider } from '../profileDataProvider';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';
import { Appbar } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { styles } from './viewMyProfile.screen.style';
import { CreditPoints } from '../../../components/profile/viewProfile/creditPoints/creditPoints';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class ViewMyProfile extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <ProfileDataProvider>
                {(user, refetch) => (
                    <View style={styles.container}>
                        <NavigationEvents
                            onWillFocus={() => {
                                refetch();
                            }}
                        />

                        <ScrollView style={styles.profileViewContainer}>
                            <Appbar.Header style={styles.appbar}>
                                <Appbar.BackAction icon="menu" onPress={() => this.props.navigation.navigate('Discover')} />
                                <Appbar.Content title="" />
                                <Appbar.Action
                                    icon="edit"
                                    onPress={() =>
                                        this.props.navigation.navigate('Edit', {
                                            close: refetch,
                                        })
                                    }
                                />
                            </Appbar.Header>
                            <ProfileView user={user} {...this.props} />
                        </ScrollView>
                        <CreditPoints creditPoints={user.profile.creditPoints} />
                    </View>
                )}
            </ProfileDataProvider>
        );
    }
}
