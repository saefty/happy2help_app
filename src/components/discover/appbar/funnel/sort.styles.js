/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../themes/colors';

const styles = StyleSheet.create({
    sortContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        color: primaryColor,
    },
    optionList: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50,
    },
    optionView: {
        borderWidth: 1.5,
        width: 105,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 15,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonText: {
        fontSize: 15,
    },
});

export default styles;
