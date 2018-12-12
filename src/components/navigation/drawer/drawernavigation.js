// @flow

import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabNavigator } from '../tabNavigation';
import { ProfileStackNavigator } from './../stackNavigators/profile.stack';
import { MyEventsStackNavigator } from './../stackNavigators/myEvents.stack';
import { OrganisationStackNavigator } from './../stackNavigators/organisation.stack';
import { EditOrganisationScreen } from '../../../screens/organisation/editOrganisation.screen'

import { DrawerScreen } from './drawer.screen';
import { ScanScreen } from '../../../qr.screen';

export const DrawerNavigator = createDrawerNavigator(
    {
        BrowseEvents: {
            screen: TabNavigator,
        },
        Profile: {
            screen: ProfileStackNavigator,
        },
        MyEvents: {
            screen: MyEventsStackNavigator,
        },
        Organisation: {
            screen: OrganisationStackNavigator,
        },
        EditOrganisation: {
            screen: EditOrganisationScreen,
            navigationOptions: () => {
                let navigationOptions = {};
                navigationOptions.drawerLabel = 'Neue Organisation';
                navigationOptions.drawerIcon = <Icon name={'group-add'} size={24} />;
                return navigationOptions;
            }
        }
        Camera: {
            screen: ScanScreen,
        },
    },
    {
        contentComponent: DrawerScreen,
        drawerWidth: 250,
    }
);
