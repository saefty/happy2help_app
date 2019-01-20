// @flow
import { StyleSheet } from 'react-native';
import { primaryColor, neutralColors } from '../../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
    },
    enabled: {
        color: primaryColor,
    },
    disabled: {
        color: neutralColors.medium,
    },
    text: {
        fontSize: 18,
    },
});
