import { StyleSheet } from 'react-native';
import { primaryStatusBar } from '../../../../themes/colors';

const green = '#4a4';
const red = '#a44';
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
        backgroundColor: '#bbb',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 0,
    },
    buttonText: {
        color: '#fff',
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
        color: green,
    },
    textElse: {
        color: red,
    },
});
