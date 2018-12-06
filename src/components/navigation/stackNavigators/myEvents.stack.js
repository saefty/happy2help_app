// @flow
import { createStackNavigator } from 'react-navigation';
import { MyEventList } from '../../../screens/myEventList/myEventList.screen';
import { EditEventFormNamespaced } from '../../event/edit.event.form';


export const MyEventsStackNavigator = createStackNavigator(
    {
        View: MyEventList,
        Edit: EditEventFormNamespaced,
    },
    {
        headerMode: 'none',
        navigationOptions:  ({navigation})=>{
            let { routeName } = navigation.state.routes[navigation.state.index];
            let navigationOptions = {};
            navigationOptions.drawerLabel = 'Meine Events';
            if (routeName === 'Edit') {
                navigationOptions.tabBarVisible = false;
            }
            return navigationOptions;
        }
    },
    {
        initialRouteName: 'View',
    }
);