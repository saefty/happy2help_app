/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    titleAndButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 0,
        fontSize: 30,
        marginTop: 15,
        textAlign: 'center',
    },
    subTitle: {
        width: '100%',
        fontSize: 10,
        textAlign: 'center',
        padding: 10,
    },
    circularButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: primaryColor,
        borderRadius: 60,
    },
});
