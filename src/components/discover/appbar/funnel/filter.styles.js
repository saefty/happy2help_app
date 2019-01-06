/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor, neutralColors } from '../../../../../themes/colors';

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
        marginRight: 10,
        height: 35,
    },
    switchTextContainer: {
        marginLeft: 2,
    },
    switchText: {
        fontSize: 12,
    },
    skillTitleContainer: {
        height: 35,
    },
    skillTitle: {
        fontSize: 12,
    },
    scroll: {
        height: 50,
        borderTopWidth: 0.5,
        borderTopColor: neutralColors.dark,
        borderBottomWidth: 0.5,
        borderBottomColor: neutralColors.dark,
    },
    datePickerContainer: {
        marginTop: 10,
        height: 80,
        backgroundColor: '#26a', 
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default styles;
