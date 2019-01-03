/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../themes/colors';

const styles = StyleSheet.create({
    sortContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        color: primaryColor,
    },
    infoContainer: {
        marginBottom: 5,
    },
    info: {
        fontSize: 16,
        color: primaryColor,
    },
    optionList: {
        marginTop: 2,
    },
    optionView: {
        borderWidth: 2,
        marginTop: 2,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    optionText: {
        fontSize: 15,
        marginLeft: 5,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
    },
});

export default styles;
