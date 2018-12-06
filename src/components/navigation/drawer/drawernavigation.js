// @flow
import { createDrawerNavigator } from 'react-navigation';

import { TabNavigator } from '../tabNavigation';
import { ProfileStackNavigator } from './../stackNavigators/profile.stack';
import { MyEventsStackNavigator } from './../stackNavigators/myEvents.stack';
import { OrganisationStackNavigator} from './../stackNavigators/organisation.stack'

import { DrawerScreen } from './drawer.screen';

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
        }

      
    },
    {
        contentComponent: DrawerScreen,
        drawerWidth: 300,
    }
);
