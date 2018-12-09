// @flow
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import { ViewMyProfile } from '../../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../../screens/myProfile/edit/editMyProfile.screen';

export const OrganisationStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        navigationOptions: ({ navigation }) => {
            let navigationOptions = {};
            navigationOptions.drawerLabel = 'Meine Organisation';
            navigationOptions.drawerIcon = <Icon name={'group'} size={24} />;
            return navigationOptions;
        },
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);
