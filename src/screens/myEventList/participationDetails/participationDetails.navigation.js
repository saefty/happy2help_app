// @flow
import * as React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { ParticipationCheckInScreen } from './participationCheckIn.screen';
import { PartcipationListScreen } from './participationList.screen';

export const ParticipationBottomNavigation = createMaterialBottomTabNavigator(
    {
        List: PartcipationListScreen,
        CheckIn: ParticipationCheckInScreen,
    },
    {
        initialRouteName: 'CheckIn',
        labeled: true,
        shifting: true,
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;

            let tabBarLabel;

            if (routeName === 'CheckIn') {
                tabBarLabel = 'Check In';
            } else if (routeName === 'List') {
                tabBarLabel = 'List';
            }

            return {
                tabBarLabel: tabBarLabel,
                tabBarIcon: ({ tintColor }: any) => {
                    // eslint-disable-line
                    const { routeName } = navigation.state;
                    switch (routeName) {
                        case 'CheckIn':
                            return <IconAntDesign name="login" size={25} color={tintColor} />;
                        case 'List':
                            return <AwesomeIcon name="list" size={22} color={tintColor} />;
                    }
                },
            };
        },
    }
);
