import { EventDetailModalNavigationMapped } from '../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../screens/organisation/organisation.screen';
import { createStackNavigator } from 'react-navigation';

import { ViewMyProfile } from '../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../screens/myProfile/edit/editMyProfile.screen';
import { DiscoverScreen } from '../../screens/discover/discover.screen';
import { MyEventList } from '../../screens/myEventList/myEventList.screen';
import { EditEventFormNamespaced } from '../event/edit.event.form';

export const DiscoverStackNavigator = createStackNavigator(
    {
        View: DiscoverScreen,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName !== 'View') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'MapView',
    }
);

//Navigation
export const ProfileStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName !== 'View') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'View',
    }
);

export const MyEventsStackNavigator = createStackNavigator(
    {
        View: MyEventList,
        Edit: EditEventFormNamespaced,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName !== 'View') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'View',
    }
);
