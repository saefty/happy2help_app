import { MapScreen } from "../../../screens/map/map.screen";
import { EventDetailModalNavigationMapped } from "../../event/eventDetailModal";
import { OrganisationDetailScreenMapped } from "../../../screens/organisation/organisation.screen";
import { ListView } from "../../../screens/listView/listView.screen";
import { createStackNavigator } from 'react-navigation';

export const DiscoverStackNavigator = createStackNavigator(
    {
        View: MapScreen,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped
    },
    {
        headerMode: 'none',
        navigationOptions:  ({navigation})=>{
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};            
            if (routeName === 'DetailedEventView') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        }
    },
    {
        initialRouteName: 'View',
    }
);

export const ListStackNavigator = createStackNavigator(
    {
        View: ListView,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped
    },
    {
        headerMode: 'none',
        navigationOptions:  ({navigation})=>{
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName === 'DetailedEventView') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        }
    },
    {
        initialRouteName: 'View',
    }
);