// @flow
import * as React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DiscoverStackNavigator, ListStackNavigator, ProfileStackNavigator, MyEventsStackNavigator } from './stack.navigations';

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Profile: ProfileStackNavigator,
        Discover: DiscoverStackNavigator,
        List: ListStackNavigator,
        MyEvents: MyEventsStackNavigator,
    },
    {
        initialRouteName: 'Profile',
        labeled: true,
        shifting: false,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }: any) => {
                // eslint-disable-line
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Profile':
                        iconName = 'person';
                        break;
                    case 'Discover':
                        iconName = 'search';
                        break;
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
