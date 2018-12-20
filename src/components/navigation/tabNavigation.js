// @flow
import * as React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { DiscoverStackNavigator } from './stackNavigators/discover.stack';
import { MyJobsStackNavigator } from './stackNavigators/myJobs.stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TabNavigator = createMaterialBottomTabNavigator(
    {
        Discover: DiscoverStackNavigator,
        MyJobs: MyJobsStackNavigator,
    },
    {
        initialRouteName: 'Discover',
        labeled: true,
        shifting: false,
        navigationOptions: () => {
            let navigationOptions = {};

            navigationOptions.drawerLabel = 'Entdecke Events';

            navigationOptions.drawerIcon = <Icon name="explore" size={24} />;

            return navigationOptions;
        },
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;

            let tabBarLabel;

            if (routeName === 'Discover') {
                tabBarLabel = 'Entdecken';
            } else if (routeName === 'MyJobs') {
                tabBarLabel = 'Meine Jobs';
            }

            return {
                tabBarLabel: tabBarLabel,
                tabBarIcon: ({ tintColor }: any) => {
                    // eslint-disable-line
                    const { routeName } = navigation.state;
                    switch (routeName) {
                        case 'Discover':
                            return <MaterialIcon name="explore" size={25} color={tintColor} />;
                        case 'MyJobs':
                            return <AwesomeIcon name="hands-helping" size={22} color={tintColor} />;
                    }
                },
            };
        },
    }
);
