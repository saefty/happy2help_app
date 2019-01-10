// @flow
import { createStackNavigator } from 'react-navigation';
import { MyParticipations } from '../../../screens/myParticipationsList/userParticipations.screen';
import { EventDetailModalNavigationMapped } from '../../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../../screens/organisation/organisation.screen';
import { EditEventFormNamespaced } from '../../event/edit.event.form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export const MyJobsStackNavigator = createStackNavigator(
    {
        View: MyParticipations,
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
