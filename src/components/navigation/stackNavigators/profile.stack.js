// @flow
import { createStackNavigator } from 'react-navigation';

import { ViewMyProfile } from '../../../screens/myProfile/view/viewMyProfile.screen';
import { EditMyProfile } from '../../../screens/myProfile/edit/editMyProfile.screen';

export const ProfileStackNavigator = createStackNavigator(
    {
        View: ViewMyProfile,
        Edit: EditMyProfile,
    },
    {
        navigationOptions: { drawerLabel: 'Mein Profil' },
        headerMode: 'none',
    },
    {
        initialRouteName: 'View',
    }
);
