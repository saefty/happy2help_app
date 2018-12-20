// @flow
import { createStackNavigator } from 'react-navigation';
import { MyEventList } from '../../../screens/myEventList/myEventList.screen';
import { EventDetailModalNavigationMapped } from './../../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../../screens/organisation/organisation.screen';
import { EditEventFormNamespaced } from '../../event/edit.event.form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { ParticipationBottomNavigation } from '../../../screens/myEventList/participationDetails/participationDetails.navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

export const MyEventsStackNavigator = createStackNavigator(
    {
        View: MyEventList,
        Edit: withMappedNavigationProps()(EditEventFormNamespaced),
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
        Participations: withMappedNavigationProps()(ParticipationBottomNavigation),
    },
    {
        headerMode: 'none',
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            navigationOptions.drawerLabel = 'Meine Events';
            navigationOptions.drawerIcon = <Icon name={'event-available'} size={24} />;

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
