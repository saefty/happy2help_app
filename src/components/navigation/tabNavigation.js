// @flow
import * as React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DiscoverStackNavigator, ListStackNavigator } from './stackNavigators/discover.stack';
import { ProfileStackNavigator } from './stackNavigators/profile.stack';

export const TabNavigator = createMaterialBottomTabNavigator(
    {
        Map: DiscoverStackNavigator,
        List: ListStackNavigator,
    },
    {
        initialRouteName: 'List',
        labeled: false,
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
                    case 'Map':
                        iconName = 'map';
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
