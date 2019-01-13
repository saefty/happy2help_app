// @flow
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 12,
        marginLeft: 10,
        position: 'absolute',
        bottom: -19,
    },
    container: {
        backgroundColor: '#e7e7e7',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    headlines: {
        flexDirection: 'row',
        marginTop: 5,
    },
    headline: { width: '50%' },
    headlineText: {
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    dateButtonsContainer: { flexDirection: 'row' },
    leftDateButton: {
        width: '50%',
        borderRightWidth: 1,
    },
    rightDateButton: {
        width: '50%',
        // borderLeftWidth: 1,
    },
    divider: {
        marginTop: 10,
        height: 1,
    },
});
