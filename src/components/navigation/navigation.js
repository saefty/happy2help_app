// @flow
import { DrawerNavigator } from './drawer/drawernavigation';
import {createAppContainer} from 'react-navigation';


export const AppContainer = createAppContainer(DrawerNavigator);
