// @flow
import { StyleSheet } from 'react-native';
import { neutralColors, primaryColor } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: primaryColor,
        height: '10%',
    },
    title: {
        fontSize: 16,
        color: neutralColors.surface,
    },
    creditPoints: {
        fontSize: 16,
        color: neutralColors.surface,
    },
});
