// @flow
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import { ViewMyProfile } from '../../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../../screens/myProfile/edit/editMyProfile.screen';

export const ProfileStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        navigationOptions:  ({navigation})=>{
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            navigationOptions.drawerLabel = 'Mein Profil';
            navigationOptions.drawerIcon = <Icon name={'account-circle'} size={24} />
            if (routeName !== 'View') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);