// @flow
import * as React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DiscoverStackNavigator } from './stackNavigators/discover.stack';
import { ProfileStackNavigator } from './stackNavigators/profile.stack';
import { MyEventsStackNavigator } from './stackNavigators/myEvents.stack';


export const TabNavigator = createMaterialBottomTabNavigator(
    {
        Discover: DiscoverStackNavigator,
        MyEvents: MyEventsStackNavigator,
    },
    {
        initialRouteName: 'Discover',
        labeled: true,
        shifting: false,      
        navigationOptions:  ({navigation})=>{
            let navigationOptions = {};
            navigationOptions.drawerLabel = 'Entdecke Events';
            navigationOptions.drawerIcon = <Icon name={'explore'} size={24} />
            return navigationOptions;
        },
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
                        iconName = 'explore';
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
