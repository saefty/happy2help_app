// @flow

import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabNavigator } from '../tabNavigation';
import { ProfileStackNavigator } from './../stackNavigators/profile.stack';
import { MyEventsStackNavigator } from './../stackNavigators/myEvents.stack';
import { OrganisationStackNavigator } from './../stackNavigators/organisation.stack';
import { EditOrganisationScreen } from '../../../screens/organisation/editOrganisation.screen';

import { DrawerScreen } from './drawer.screen';
import { MyQRScreen } from '../../../screens/myQR.screen';
import { DiscoverScreen } from '../../../screens/discover/discover.screen';
import { OrganisationTabNavigator } from '../organisation/organisationTabNavigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

export const DrawerNavigator = createDrawerNavigator(
    {
        Profile: {
            screen: ProfileStackNavigator,
        },
        BrowseEvents: {
            screen: TabNavigator,
        },
        MyEvents: {
            screen: MyEventsStackNavigator,
        },
        Organisation: {
            screen: OrganisationStackNavigator,
        },
        MyQRCode: {
            screen: MyQRScreen,
            navigationOptions: () => {
                return {
                    drawerLabel: () => null,
                };
            },
        },
        EditOrganisation: {
            screen: EditOrganisationScreen,
            navigationOptions: () => {
                return {
                    drawerLabel: () => null,
                };
            },
        },
        OrganisationModeScreen: {
            screen: withMappedNavigationProps()(OrganisationTabNavigator),
            navigationOptions: () => {
                return {
                    drawerLabel: () => null,
                };
            },
        },
    },
    {
        initialRouteName: 'BrowseEvents',
        contentComponent: DrawerScreen,
        drawerWidth: 250,
    }
);
