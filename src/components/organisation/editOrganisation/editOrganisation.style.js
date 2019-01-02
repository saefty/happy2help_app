/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 100 + '%',
    },
    inputContainer: {
        justifyContent: 'center',
        marginTop: 15,
        padding: 20,
        width: '100%',
    },
    editPicture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 200,
        margin: 10,
        borderWidth: 8,
        borderColor: 'white',
    },
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
