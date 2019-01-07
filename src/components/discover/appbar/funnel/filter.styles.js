/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor, neutralColors } from '../../../../../themes/colors';

const styles = StyleSheet.create({
    filterContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 18,
        marginTop: 5,
        color: primaryColor,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '100%',
        minHeight: 22.5,
        maxHeight: 45,
    },
    smallText: {
        fontSize: 12,
    },
    scroll: {
        marginTop: 5,
        height: 45,
        borderTopWidth: 0.5,
        borderTopColor: neutralColors.dark,
        borderBottomWidth: 0.5,
        borderBottomColor: neutralColors.dark,
    },
    left: {
        flex: 6,
        flexWrap: 'wrap',
    },
    right: {
        flex: 1,
    },
    datePickerContainer: {
        marginTop: 10,
        backgroundColor: '#cfcfcf',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    datePicker: {
        color: '#000',
        fontSize: 12,
    },
});

export default styles;
