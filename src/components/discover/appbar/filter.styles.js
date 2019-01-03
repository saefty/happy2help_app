/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../themes/colors';

const styles = StyleSheet.create({
    filterContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    titleContainer: {
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: primaryColor,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '95%',
    },
    switchTextContainer: {
        width: '80%',
        marginLeft: 2,
    },
    switchText: {
        fontSize: 12,
    },
});

export default styles;
