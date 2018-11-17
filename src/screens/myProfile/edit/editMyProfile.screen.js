// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ProfileView } from './../../../components/viewProfile/profile';

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
                <Text>
                    editScreen
                </Text>
            </View>
        );
    }
}
