// @flow
import { StyleSheet } from 'react-native';
import { neutralColors, neutralTextColors } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    itemLeft: {
        backgroundColor: neutralColors.surface,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: neutralColors.medium,
        borderRightWidth: 1,
    },
    itemRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 5,
        flex: 1,
        padding: 5,
        borderTopWidth: 1,
        borderColor: neutralColors.medium,
        flexDirection: 'row',
    },
    text: {
        color: neutralTextColors.medium,
    },
    textIconContainer: {
        alignItems: 'center',
    },
});
