// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ProfileDataProvider } from '../profileDataProvider';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';

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
                    {(user, refetch) => <ProfileView user={user} {...this.props} refetch={refetch} />}
                </ProfileDataProvider>
            </View>
        );
    }
}
