// @flow
import { createStackNavigator } from 'react-navigation';

import * as React from 'react';
import { EditMyOrganisationScreen } from '../../../screens/organisation/editMyOrganisation.screen';
import { MyOrganisationScreen } from '../../../screens/organisation/myOrganisation.screen';

export const ViewMyOrganisationStack = createStackNavigator(
    {
        View: MyOrganisationScreen,
        Edit: EditMyOrganisationScreen,
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
