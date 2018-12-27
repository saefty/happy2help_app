// @flow
import { EventDetailModalNavigationMapped } from './../../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../../screens/organisation/organisation.screen';
import { createStackNavigator } from 'react-navigation';
import { DiscoverScreen } from './../../../screens/discover/discover.screen';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { EditEventFormNamespaced } from '../../event/edit.event.form';

export const DiscoverStackNavigator = createStackNavigator(
    {
        View: DiscoverScreen,
        Edit: withMappedNavigationProps()(EditEventFormNamespaced),
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
