/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        margin: 3,
        elevation: 3,
    },
    profilePicture: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        borderRadius: 150,
        margin: 10,
    },
    adminPicture: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: primaryColor, 
        margin: 10,
    },
    username: {
        flex: 0,
        fontSize: 35,
    },
    adminText: {
        color: primaryColor,
    }
});
