// @flow
import { createStackNavigator } from 'react-navigation';
import * as React from 'react';
import { OrganisationEventList } from '../../../screens/myEventList/organisationEventList';
import { EditEventFormNamespaced } from '../../event/edit.event.form';
import { EventDetailModalNavigationMapped } from '../../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../../screens/organisation/organisation.screen';
import { ParticipationBottomNavigation } from '../../../screens/myEventList/participationDetails/participationDetails.navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

export const OrganisationEventsStackNavigation = createStackNavigator(
    {
        ViewOrgaEvents: OrganisationEventList,
        EditEventFromOrga: EditEventFormNamespaced,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
        Participations: withMappedNavigationProps()(ParticipationBottomNavigation),
    },
    {
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName !== 'ViewOrgaEvents') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
        headerMode: 'none',
    },
    {
        initialRouteName: 'ViewOrgaEvents',
    }
);
