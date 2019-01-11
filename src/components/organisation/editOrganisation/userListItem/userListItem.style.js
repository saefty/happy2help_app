/* @flow */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        alignContent: 'center',
        backgroundColor: '#F8F8F8',
        margin: 8,
        elevation: 7,
    },
    profilePicture: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
        borderWidth: 5,
        borderColor: 'white',
    },
    username: {
        flex: 0,
        fontSize: 35,
    }
});
