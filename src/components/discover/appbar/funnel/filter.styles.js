/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor, neutralColors } from '../../../../../themes/colors';

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    spacedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        fontWeight: 'bold',
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
        top: -8, 
        height: 35,    
    },
    left: {
        flex: 6,
        flexWrap: 'wrap',
    },
    right: {
        flex: 1,
    }, 
    datePicker: {
        color: '#000',
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: neutralColors.dark,
    },
});

export default styles;
