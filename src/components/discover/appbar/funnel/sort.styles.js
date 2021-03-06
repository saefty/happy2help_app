/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor, neutralColors } from '../../../../../themes/colors';

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold',
        color: primaryColor,
    },
    optionList: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    optionView: {
        borderWidth: 1.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        borderRadius: 5,
    },
    radioContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider : {
        height: 1,
        backgroundColor: neutralColors.dark,
    }
});

export default styles;
