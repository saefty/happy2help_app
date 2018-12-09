// @flow
import { createDrawerNavigator } from 'react-navigation';

import { TabNavigator } from '../tabNavigation';
import { ProfileStackNavigator } from './../stackNavigators/profile.stack';
import { MyEventsStackNavigator } from './../stackNavigators/myEvents.stack';
import { OrganisationStackNavigator } from './../stackNavigators/organisation.stack';

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
        Camera: {
            screen: ScanScreen,
        },
    },
    {
        contentComponent: DrawerScreen,
        drawerWidth: 250,
    }
);
