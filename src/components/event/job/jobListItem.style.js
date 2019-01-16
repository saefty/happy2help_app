import { StyleSheet } from 'react-native';
import { neutralColors, secondaryColor } from '../../../../themes/colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    heading: {
        color: secondaryColor,
        fontWeight: 'bold',
    },
    row: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    posApplyButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    divider: {
        backgroundColor: neutralColors.light,
        marginBottom: 10,
        marginTop: 10,
        height: 2,
    },
    boldText: {
        fontWeight: 'bold',
    },
    skillContainer: {
        marginTop: 10,
    },
    positions: {
        marginBottom: 10,
    },
    button: {},
});
