// @flow
import { createStackNavigator } from 'react-navigation';
import * as React from 'react';
import { OrganisationEventList } from '../../../screens/myEventList/organisationEventList';
import { EditEventFormNamespaced } from '../../event/edit.event.form';
import { EventDetailModalNavigationMapped } from '../../event/eventDetailModal';
import { OrganisationDetailScreenMapped } from '../../../screens/organisation/organisation.screen';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { ParticipationCheckInScreen } from '../../../screens/myEventList/participationDetails/participationCheckIn.screen';
import { PartcipationListScreen } from '../../../screens/myEventList/participationDetails/participationList.screen';
import { ViewParticipantScreen } from '../../../screens/myProfile/view/viewParticipant.screen';

export const OrganisationEventsStackNavigation = createStackNavigator(
    {
        ViewOrgaEvents: OrganisationEventList,
        Edit: EditEventFormNamespaced,
        DetailedEventView: EventDetailModalNavigationMapped,
        DetailedOrganisationView: OrganisationDetailScreenMapped,
        CheckIn: withMappedNavigationProps()(ParticipationCheckInScreen),
        Applications: withMappedNavigationProps()(PartcipationListScreen),
        ViewParticipant: withMappedNavigationProps()(ViewParticipantScreen),
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
