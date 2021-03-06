// @flow
import * as React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { ViewMyOrganisationStack } from './view.stack';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { OrganisationEventsStackNavigation } from './events.stack';

export const OrganisationTabNavigator = createMaterialBottomTabNavigator(
    {
        ViewOrganisation: withMappedNavigationProps()(ViewMyOrganisationStack),
        OrganisationEvents: withMappedNavigationProps()(OrganisationEventsStackNavigation),
    },
    {
        initialRouteName: 'OrganisationEvents',
        labeled: true,
        shifting: false,
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;

            let tabBarLabel;

            if (routeName === 'OrganisationEvents') {
                tabBarLabel = 'Events';
            } else if (routeName === 'ViewOrganisation') {
                tabBarLabel = 'Organisation';
            }

            return {
                tabBarLabel: tabBarLabel,
                tabBarIcon: ({ tintColor }: any) => {
                    // eslint-disable-line
                    const { routeName } = navigation.state;
                    switch (routeName) {
                        case 'ViewOrganisation':
                            return <MaterialIcon name="group" size={25} color={tintColor} />;
                        case 'OrganisationEvents':
                            return <MaterialIcon name="event-available" size={25} color={tintColor} />;
                    }
                },
            };
        },
    }
);
