// @flow
import { createStackNavigator } from 'react-navigation';

import * as React from 'react';
import { OrganisationEventList } from '../../../screens/myEventList/organisationEventList';
import { EditEventFormNamespaced } from '../../event/edit.event.form';

export const OrganisationEventsStackNavigation = createStackNavigator(
    {
        View: OrganisationEventList,
        EditEvent: EditEventFormNamespaced,
    },
    {
        navigationOptions: ({ navigation }) => {
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            if (routeName !== 'View') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        },
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);
