import { StyleSheet } from 'react-native';
import { primaryStatusBar, statusColors, neutralColors } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    accept: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    },
    decline: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    alreadyAccepted: {
        backgroundColor: neutralColors.light,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 0,
    },
    buttonText: {
        color: neutralColors.background,
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#000',
        fontSize: 25,
    },
    text: {
        fontSize: 15,
    },
    textApplied: {
        color: primaryStatusBar,
    },
    textAccepted: {
        color: statusColors.success,
    },
    textElse: {
        color: statusColors.alert,
    },
});
