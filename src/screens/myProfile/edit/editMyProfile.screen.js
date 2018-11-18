// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { EditProfile } from '../../../components/editProfile/editProfile';
import { ProfileDataProvider } from './../profileDataProvider';



type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class EditMyProfile extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ProfileDataProvider>
                    {user => <EditProfile user={user} {...this.props}/>}
                </ProfileDataProvider>
            </View>
        );
    }
}
