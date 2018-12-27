// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ProfileDataProvider } from '../profileDataProvider';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';
import { Appbar } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class ViewMyProfile extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ProfileDataProvider>
                    {(user, refetch) => (
                        <View>
                            <NavigationEvents onWillFocus={() => refetch())} />
                            <Appbar.Header style={{ elevation: 0 }}>
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
                                <Appbar.Action icon="more-vert" />
                            </Appbar.Header>
                            <ProfileView user={user} {...this.props} />
                        </View>
                    )}
                </ProfileDataProvider>
            </View>
        );
    }
}
