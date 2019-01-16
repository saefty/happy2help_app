// @flow
import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    appbar: {
       
    },
    profilePicture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 200,
        margin: 20,
    },
    title: { margin: 5 },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: primaryColor,
        borderRadius: 60,
        bottom: 0,
    },
});
