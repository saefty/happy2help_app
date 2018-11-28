// @flow
import * as React from 'react';
import { View, Text } from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ViewMyProfile } from '../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../screens/myProfile/edit/editMyProfile.screen';
import { MapScreen } from '../../screens/map/map.screen';
import { ListView } from '../../screens/listView/listView.screen';
import { MyEventList } from '../../screens/myEventList/myEventList.screen';
import { EditEventFormNamespaced } from '../event/edit.event.form';

//Navigation
const ProfileStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);

const MyEventsStackNavigator = createStackNavigator(
    {
        View: MyEventList,
        Edit: EditEventFormNamespaced,
    },
    {
        headerMode: 'none',
        navigationOptions:  ({navigation})=>{
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName === 'Edit') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        }
    },
    {
        initialRouteName: 'View',
    }
);
const TabNavigator = createMaterialBottomTabNavigator(
    {
        Profile: ProfileStackNavigator,
        Discover: MapScreen,
        List: ListView,
        MyEvents: MyEventsStackNavigator,
    },
    {
        initialRouteName: 'Profile',
        labeled: true,
        shifting: false,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }: any) => {// eslint-disable-line
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Profile':
                        iconName = 'person';
                        break;
                    case 'Discover':
                        iconName = 'search';
                        break;search
                    case 'List':
                        iconName = 'list';
                        break;
                    case 'MyEvents':
                        iconName = 'event-available';
                }               
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
    }
);

export const AppContainer = createAppContainer(TabNavigator);
