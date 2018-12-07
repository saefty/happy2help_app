import { MapScreen } from '../../screens/map/map.screen';
import { EventDetailModalNavigationMapped } from '../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../screens/organisation/organisation.screen';
import { ListView } from '../../screens/listView/listView.screen';
import { createStackNavigator } from 'react-navigation';

import { ViewMyProfile } from '../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../screens/myProfile/edit/editMyProfile.screen';
import { MyEventList } from '../../screens/myEventList/myEventList.screen';
import { EditEventFormNamespaced } from '../event/edit.event.form';

export const DiscoverStackNavigator = createStackNavigator(
    {
        View: MapScreen,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName === 'DetailedEventView') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'View',
    }
);

export const ListStackNavigator = createStackNavigator(
    {
        View: ListView,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName === 'DetailedEventView') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'View',
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
    },
    {
        initialRouteName: 'View',
    }
);

export const MyEventsStackNavigator = createStackNavigator(
    {
        View: MyEventList,
        DetailedEventView: EventDetailModalNavigationMapped,
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName === 'Edit') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
    },
    {
        initialRouteName: 'View',
    }
);
