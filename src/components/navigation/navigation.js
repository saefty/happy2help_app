// @flow
import * as React from 'react';
import { View, Text } from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ViewMyProfile } from '../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../screens/myProfile/edit/editMyProfile.screen';
import { MapScreen } from '../../screens/map/map.screen';
import { ListView } from '../../screens/listView/listView.screen';

class Chat extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Chat</Text>
            </View>
        );
    }
}

//Navigation
const ProfileStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Profile: ProfileStackNavigator,
        Map: MapScreen,
        List: ListView,
        Chat: Chat,
    },
    {
        initialRouteName: 'Profile',
        labeled: false,
        shifting: false,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Profile':
                        iconName = 'person';
                        break;
                    case 'Map':
                        iconName = 'map';
                        break;
                    case 'List':
                        iconName = 'list';
                        break;
                    case 'Chat':
                        iconName = 'chat-bubble';
                }               
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
    }
);

export const AppContainer = createAppContainer(TabNavigator);
