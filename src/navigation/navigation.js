import { Navigation } from 'react-native-navigation';

import { EditMyProfile } from './../screens/myProfile/edit/editMyProfile.screen'


Navigation.registerComponent(`navigation.EditMyProfile`, () => EditMyProfile);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: "navigation.EditMyProfile"
            }
          }]
        }
      }
    });
  });