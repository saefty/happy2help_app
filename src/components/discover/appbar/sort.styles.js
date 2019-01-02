/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../themes/colors';

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 5,
    },
    title: {
        fontSize: 23,
        marginLeft: 10,
        color: primaryColor,
    },
    optionList: {
        marginTop: 2,
    },
    optionView: {
        width: '90%',
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 15,
        marginTop: 2,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 20,
        width: '95%',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 5,
    },
});

export default styles;
