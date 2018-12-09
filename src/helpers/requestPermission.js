import { PermissionsAndroid } from 'react-native';
import { Sentry } from 'react-native-sentry';
export async function requestPermission(permission) {
    try {
        const granted = await PermissionsAndroid.request(permission, {
            title: 'Location persmission',
            message: 'Need location access to track you all over the world.',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Sentry.captureMessage('You can now use the', permission);
        } else {
            requestPermission(permission);
            Sentry.captureMessage('Permission denied', permission);
        }
    } catch (err) {
        Sentry.captureException(err);
    }
}
