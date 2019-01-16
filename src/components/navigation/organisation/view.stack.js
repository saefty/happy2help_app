// @flow
import { createStackNavigator } from 'react-navigation';

import * as React from 'react';
import { EditMyOrganisationScreen } from '../../../screens/organisation/editMyOrganisation.screen';
import { MyOrganisationScreen } from '../../../screens/organisation/myOrganisation.screen';
import { AddMemberScreen } from '../../../screens/organisation/addMember.screen';


export const ViewMyOrganisationStack = createStackNavigator(
    {
        View: MyOrganisationScreen,
        Edit: EditMyOrganisationScreen,
        Member: AddMemberScreen
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
