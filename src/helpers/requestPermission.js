import { PermissionsAndroid } from 'react-native';

export async function requestPermission(permission) {
    try {
      const granted = await PermissionsAndroid.request(
        permission,
        {
          'title': 'Location persmission',
          'message': 'Need location access to track you all over the world.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the ", permission)
      } else {
        console.log(permission, " permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  